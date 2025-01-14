const dataService = require("./dataService");

const validationService = {
  validateUser: async (user, isNew) => {
    const reservedWords = ["admin", "user", "support"];
    const errors = {};

    // Validate username
    if (!user.username && isNew) {
      errors.username = "Username is required.";
    } else if (user.username) {
      if (user.username.length < 3 || user.username.length > 30) {
        errors.username = "Username must be between 3 and 30 characters.";
      } else if (!/^[A-Za-z0-9_-]+$/.test(user.username)) {
        errors.username =
          "Username can only contain letters, numbers, underscores, and hyphens.";
      } else if (/^\s|\s$/.test(user.username)) {
        errors.username = "Username cannot have leading or trailing spaces.";
      } else if (reservedWords.includes(user.username.trim().toLowerCase())) {
        errors.username = `Username cannot be one of the reserved words: ${reservedWords.join(
          ", "
        )}.`;
      }
      // Add uniqueness check (you would replace this with a DB lookup)
      const isUnique = await checkUniqueUsername(user.username);
      if (!isUnique) {
        errors.username = "The username is already taken.";
      }
    }

    // Validate email
    if (!user.email && isNew) {
      errors.email = "Email is required.";
    } else if (user.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user.email)) {
        errors.email = "Email is invalid.";
      }
      // Add uniqueness check for email (replace with a DB lookup)
      const isEmailUnique = await checkUniqueEmail(user.email);
      if (!isEmailUnique) {
        errors.email = "The email is already taken.";
      }
    }

    // Validate password
    if (!user.password && isNew) {
      errors.password = "Password is required.";
    } else if (user.password) {
      if (user.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
      } else if (!/[A-Z]/.test(user.password) || !/[a-z]/.test(user.password)) {
        errors.password =
          "Password must include both uppercase and lowercase letters.";
      } else if (!/[0-9]/.test(user.password)) {
        errors.password = "Password must include at least one number.";
      }
    }

    // Validate date of birth
    if (user.dateOfBirth !== undefined && user.dateOfBirth.trim() !== "") {
      if (user.dateOfBirth) {
        const date = new Date(user.dateOfBirth);
        if (isNaN(date.getTime())) {
          errors.dateOfBirth = "Date of birth must be a valid date.";
        }
      }
    }

    // Validate profile picture
    if (
      user.profilePicture !== undefined &&
      user.profilePicture.trim() !== ""
    ) {
      if (user.profilePicture) {
        const allowedExtensions = ["jpg", "jpeg", "png"];
        const fileExtension = user.profilePicture
          .split(".")
          .pop()
          .toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
          errors.profilePicture =
            "Profile picture must be a JPG, JPEG or PNG image.";
        }
      }
    }

    // Validate about
    if (user.about !== undefined && user.about.trim() !== "") {
      if (user.about && user.about.length > 500) {
        errors.about = "About section must not exceed 500 characters.";
      }
    }

    // Validate isAdmin
    if (
      user.isAdmin !== 0 &&
      user.isAdmin !== 1 &&
      user.isAdmin !== undefined
    ) {
      errors.isAdmin = "isAdmin must be 0 or 1.";
    }

    // Return validation result
    return Object.keys(errors).length > 0 ? errors : null;
  },

  validateNews: (news, isNew) => {
    const errors = {};

    // Validate title
    if (!news.title && isNew) {
      errors.title = "Title is required.";
    } else if (news.title) {
      if (typeof news.title !== "string") {
        errors.title = "Title must be a string.";
      } else if (news.title.length < 3) {
        errors.title = "Title must be at least 3 characters long.";
      } else if (news.title.length > 50) {
        errors.title = "Title must not exceed 50 characters.";
      }
    }

    // Validate content
    if (!news.content && isNew) {
      errors.content = "Content is required.";
    }

    // Validate image
    if (isNew && !news.image) {
      errors.image = "Image is required.";
    } else if (news.image && typeof news.image === "string") {
      const allowedExtensions = ["jpg", "jpeg", "png"];
      const fileExtension = news.image.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        errors.image = "Image must be a JPG, JPEG, or PNG image.";
      }
    }

    // Return validation result
    return Object.keys(errors).length > 0 ? errors : null;
  },

  validateForm: (form, isNew) => {
    const reservedWords = ["admin", "user", "support"];
    const errors = {};

    // Validate name
    if (!form.name && isNew) {
      errors.name = "Name is required.";
    } else if (form.name) {
      if (typeof form.name !== "string") {
        errors.name = "Name must be a string.";
      } else {
        if (form.name.length < 3) {
          errors.name = "Name must be at least 3 characters long.";
        }
        if (form.name.length > 30) {
          errors.name = "Name must not exceed 30 characters.";
        }
        if (reservedWords.includes(form.name)) {
          errors.name = "This name is not allowed.";
        }
        if (!/^\S.*\S$|^\S$/.test(form.name)) {
          errors.name = "Name must not start or end with whitespace.";
        }
      }
    }

    // Validate email
    if (!form.email && isNew) {
      errors.email = "Email is required.";
    } else if (form.email) {
      if (typeof form.email !== "string") {
        errors.email = "Email must be a string.";
      } else {
        if (!form.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
          errors.email = "Email must be a valid email address.";
        }
        if (form.email !== form.email.toLowerCase()) {
          errors.email = "Email must be in lowercase.";
        }
        if (form.email.length > 255) {
          errors.email = "Email must not exceed 255 characters.";
        }
      }
    }

    // Validate subject
    if (!form.subject && isNew) {
      errors.subject = "Subject is required.";
    } else if (form.subject) {
      if (typeof form.subject !== "string") {
        errors.subject = "Subject must be a string.";
      } else {
        if (form.subject.length < 3) {
          errors.subject = "Subject must be at least 3 characters long.";
        }
        if (form.subject.length > 255) {
          errors.subject = "Subject must not exceed 255 characters.";
        }
      }
    }

    // Validate message
    if (!form.message && isNew) {
      errors.message = "Message is required.";
    } else if (form.message) {
      if (typeof form.message !== "string") {
        errors.message = "Message must be a string.";
      } else {
        if (form.message.length < 3) {
          errors.message = "Message must be at least 3 characters long.";
        }
        if (form.message.length > 1000) {
          errors.message = "Message must not exceed 1000 characters.";
        }
      }
    }

    if (!isNew && form.status) {
      const statusTypes = ["UNREAD", "READ", "SOLVED"];
      // Validate if status is one of the valid types
      if (!statusTypes.includes(form.status.toUpperCase())) {
        errors.status = "Status must be one of: UNREAD, READ, or SOLVED.";
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  },
};

// Simulated uniqueness check functions
async function checkUniqueUsername(username) {
  try {
    const existingUsernames = await dataService.getExistingUsernames();
    return !existingUsernames.includes(username);
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    throw error;
  }
}

async function checkUniqueEmail(email) {
  try {
    const existingEmails = await dataService.getExistingEmails();
    return !existingEmails.includes(email);
  } catch (error) {
    console.error("Error checking email uniqueness:", error);
    throw error;
  }
}

module.exports = validationService;
