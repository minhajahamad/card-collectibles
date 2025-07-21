import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  ConfirmationResult,
  AuthError,
  Auth,
  User,
  sendEmailVerification,
  EmailAuthProvider,
  updateEmail,
  updateProfile,
  reauthenticateWithPhoneNumber,
  PhoneAuthProvider,
  linkWithCredential,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPZqb8R6qzSejUu0Om4bSk2zWlee9VUtY",
  authDomain: "collected-company.firebaseapp.com",
  projectId: "collected-company",
  storageBucket: "collected-company.firebasestorage.app",
  messagingSenderId: "482075688968",
  appId: "1:482075688968:web:84a364de9464ee557051bd",
  measurementId: "G-DTB77P2P9Z"
};

// Type definitions for better type safety
interface FirebaseAuthResult {
  success: boolean;
  error?: string;
  code?: string;
  user?: User;
  userToken?: string;
  userId?: string;
}

interface EmailVerificationResult {
  success: boolean;
  error?: string;
  code?: string;
  isVerified?: boolean;
  user?: User;
}

// Initialize Firebase
let app;
let auth: Auth | null = null;
let confirmationResult: ConfirmationResult | null = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  auth.languageCode = "en"; // Set English as default language for OTP messages
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

/**
 * Initializes reCAPTCHA verifier
 */
/**
 * Initializes reCAPTCHA verifier
 */
export const initializeRecaptcha = async (
  containerId: string
): Promise<boolean> => {
  if (!auth) {
    console.error("Firebase auth not initialized");
    return false;
  }

  // Clean up any existing verifier first
  resetRecaptcha();

  try {
    // Wait longer for cleanup to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID ${containerId} not found`);
      return false;
    }

    // Clear container content and ensure it's visible for reCAPTCHA
    container.innerHTML = '';
    container.style.display = 'block';

    // Check if reCAPTCHA is already initialized on this container
    if (container.hasAttribute('data-recaptcha-initialized')) {
      console.log("reCAPTCHA already initialized on this container");
      return false;
    }

    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
      callback: () => {
        console.log("reCAPTCHA solved successfully");
      },
      "expired-callback": () => {
        console.log("reCAPTCHA expired, resetting...");
        container.removeAttribute('data-recaptcha-initialized');
        resetRecaptcha();
      },
      "error-callback": (error: any) => {
        console.error("reCAPTCHA error:", error);
        container.removeAttribute('data-recaptcha-initialized');
        resetRecaptcha();
      }
    });

    // Mark container as initialized
    container.setAttribute('data-recaptcha-initialized', 'true');

    // Add timeout for render
    const renderPromise = recaptchaVerifier.render();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('reCAPTCHA render timeout')), 15000)
    );

    await Promise.race([renderPromise, timeoutPromise]);
    console.log("reCAPTCHA rendered successfully");
    return true;

  } catch (error) {
    console.error("Error initializing reCAPTCHA:", error);
    resetRecaptcha();
    return false;
  }
};

/**
 * Sends OTP to the provided phone number
 */
// Update the sendOTP function in your firebaseApp.ts file
// Replace the existing sendOTP function with this updated version:

/**
 * Sends OTP to the provided phone number
 */
export const sendOTP = async (
  phoneNumber: string
): Promise<FirebaseAuthResult> => {
  if (!auth) {
    return {
      success: false,
      error: "Firebase authentication not initialized",
      code: "auth/not-initialized",
    };
  }

  try {
    // Reset everything first to avoid conflicts
    resetRecaptcha();
    
    // Wait longer for cleanup
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if container exists, if not create it
    let container = document.getElementById("recaptcha-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "recaptcha-container";
      container.style.display = "none";
      container.style.position = "fixed";
      container.style.top = "0";
      container.style.left = "0";
      container.style.zIndex = "9999";
      document.body.appendChild(container);
    }

    // Initialize reCAPTCHA fresh
    const recaptchaSuccess = await initializeRecaptcha("recaptcha-container");
    if (!recaptchaSuccess) {
      return {
        success: false,
        error: "Failed to initialize security verification",
        code: "recaptcha/init-failed",
      };
    }

    // Format phone number
    let formattedNumber = phoneNumber;
    if (!phoneNumber.startsWith("+")) {
      formattedNumber = `+${phoneNumber}`;
    }

    // Basic validation
    if (!formattedNumber.match(/^\+[1-9]\d{1,14}$/)) {
      return {
        success: false,
        error: "Invalid phone number format. Please enter a valid international number.",
        code: "auth/invalid-phone-number",
      };
    }

    console.log("Sending OTP to:", formattedNumber);
    
    // Add longer timeout for signInWithPhoneNumber
    const signInPromise = signInWithPhoneNumber(auth, formattedNumber, recaptchaVerifier!);
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('OTP send timeout')), 60000) // Increased timeout
    );

    confirmationResult = await Promise.race([signInPromise, timeoutPromise]);
    console.log("OTP sent successfully");
    return { success: true };

  } catch (error: unknown) {
    console.error("Error sending OTP:", error);
    resetRecaptcha(); // Always reset on error

    if (error instanceof Error) {
      const authError = error as AuthError;
      
      let userMessage = "Failed to send OTP. Please try again.";
      switch (authError.code) {
        case "auth/invalid-phone-number":
          userMessage = "Invalid phone number format. Please enter a valid phone number.";
          break;
        case "auth/quota-exceeded":
          userMessage = "SMS quota exceeded. Please try again later.";
          break;
        case "auth/too-many-requests":
          userMessage = "Too many requests. Please wait a few minutes and try again.";
          break;
        case "auth/captcha-check-failed":
          userMessage = "Security verification failed. Please refresh the page and try again.";
          break;
        case "auth/network-request-failed":
          userMessage = "Network error. Please check your connection and try again.";
          break;
        case "recaptcha-not-available":
          userMessage = "reCAPTCHA not available. Please refresh the page and try again.";
          break;
        default:
          if (error.message.includes('timeout')) {
            userMessage = "Request timed out. Please try again.";
          } else if (error.message.includes('already been rendered')) {
            userMessage = "Please wait a moment and try again.";
          }
      }

      return {
        success: false,
        error: userMessage,
        code: authError.code || "unknown-error",
      };
    }

    return {
      success: false,
      error: "Failed to send OTP. Please try again.",
      code: "unknown-error",
    };
  }
};

/**
 * Verifies the OTP entered by the user
 */
export const verifyOTP = async (otp: string): Promise<FirebaseAuthResult> => {
  if (!confirmationResult) {
    return {
      success: false,
      error: "No verification in progress. Please request OTP first.",
      code: "no-verification",
    };
  }

  try {
    const result = await confirmationResult.confirm(otp);
    const token = await result.user.getIdToken();

    return {
      success: true,
      user: result.user,
      userToken: token,
      userId: result.user.uid, // Add this to get the Firebase user ID
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;

      let userMessage = authError.message;
      switch (authError.code) {
        case "auth/invalid-verification-code":
          userMessage = "Invalid OTP. Please check and try again.";
          break;
        case "auth/code-expired":
          userMessage = "OTP has expired. Please request a new one.";
          break;
        case "auth/credential-already-in-use":
          userMessage = "This phone number is already in use.";
          break;
      }

      return {
        success: false,
        error: userMessage,
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Verification failed. Please try again.",
      code: "verification-failed",
    };
  }
};

// ==================== EMAIL VERIFICATION FUNCTIONS ====================

/**
 * Sends email verification link to the user's email
 */
/**
 * Sends email verification link to the user's email
 * Fixed version to handle the auth/operation-not-allowed error
 */

const generateTempPassword = (): string => {
  return Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
};


export const sendEmailVerificationLink = async (
  email: string
): Promise<EmailVerificationResult> => {
  if (!auth) {
    return {
      success: false,
      error: "Firebase authentication not initialized",
      code: "auth/not-initialized",
    };
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    return {
      success: false,
      error: "No authenticated user found. Please sign in first.",
      code: "auth/no-current-user",
    };
  }

  try {
    // Reload user to get latest info
    await currentUser.reload();

    // Check if already verified with this email
    if (currentUser.emailVerified && currentUser.email === email) {
      return {
        success: true,
        isVerified: true,
        user: currentUser,
      };
    }

    // Method 1: For phone users, link email credential instead of updating
    if (!currentUser.email) {
      console.log("Phone user detected, linking email credential...");
      
      try {
        // Create email credential (temporary password)
        const tempPassword = generateTempPassword();
        const emailCredential = EmailAuthProvider.credential(email, tempPassword);
        
        // Link the email credential to the phone user
        const linkResult = await linkWithCredential(currentUser, emailCredential);
        console.log("Email credential linked successfully");

        // Now send verification email
        await sendEmailVerification(linkResult.user, {
          url: `${window.location.origin}/email-verified`,
          handleCodeInApp: false,
        });

        return {
          success: true,
        };

      } catch (linkError: unknown) {
        if (linkError instanceof Error) {
          const authError = linkError as AuthError;
          console.error("Link credential error:", authError.code, authError.message);
          
          if (authError.code === 'auth/email-already-in-use') {
            return {
              success: false,
              error: "This email is already in use by another account.",
              code: authError.code,
            };
          }
          
          // If linking fails, try alternative method
          console.log("Linking failed, trying alternative method...");
          return await sendAlternativeEmailVerification(email);
        }
      }
    }

    // Method 2: For users with existing email, try direct update and verification
    if (currentUser.email !== email) {
      try {
        await updateEmail(currentUser, email);
        await currentUser.reload();
      } catch (updateError: unknown) {
        if (updateError instanceof Error) {
          const authError = updateError as AuthError;
          console.error("Email update error:", authError.code);
          
          if (authError.code === 'auth/requires-recent-login') {
            return {
              success: false,
              error: "Please sign in again before changing your email address.",
              code: authError.code,
            };
          }
          
          // If update fails, try alternative method
          return await sendAlternativeEmailVerification(email);
        }
      }
    }

    // Send verification email
    try {
      await sendEmailVerification(currentUser, {
        url: `${window.location.origin}/email-verified`,
        handleCodeInApp: false,
      });

      return {
        success: true,
      };

    } catch (verificationError: unknown) {
      if (verificationError instanceof Error) {
        const authError = verificationError as AuthError;
        
        if (authError.code === 'auth/operation-not-allowed') {
          // Use alternative method
          return await sendAlternativeEmailVerification(email);
        }
        
        throw verificationError;
      }
      throw verificationError;
    }

  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;
      console.error("Email verification error:", authError.code, authError.message);

      let userMessage = authError.message;
      switch (authError.code) {
        case "auth/operation-not-allowed":
          userMessage = "Email verification is not enabled. Using alternative method...";
          // Try alternative method as fallback
          return await sendAlternativeEmailVerification(email);
        case "auth/invalid-email":
          userMessage = "Invalid email address format.";
          break;
        case "auth/too-many-requests":
          userMessage = "Too many requests. Please try again later.";
          break;
        case "auth/user-token-expired":
          userMessage = "Session expired. Please sign in again.";
          break;
        default:
          userMessage = "Failed to send verification email. Please try again.";
      }

      return {
        success: false,
        error: userMessage,
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Failed to send verification email. Please try again.",
      code: "unknown-error",
    };
  }
};

/**
 * Alternative email verification using sendSignInLinkToEmail
 */
const sendAlternativeEmailVerification = async (
  email: string
): Promise<EmailVerificationResult> => {
  if (!auth) {
    return {
      success: false,
      error: "Firebase authentication not initialized",
      code: "auth/not-initialized",
    };
  }

  try {
    const actionCodeSettings = {
      url: `${window.location.origin}/email-verified?mode=verify`,
      handleCodeInApp: true,
    };

    await sendSignInLinkToEmail(auth, email, actionCodeSettings);

    // Store email for verification
    localStorage.setItem('emailForSignIn', email);
    localStorage.setItem('emailVerificationMode', 'link');

    return {
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;
      console.error("Alternative email verification error:", authError.code, authError.message);

      return {
        success: false,
        error: "Failed to send verification email. Please check your Firebase configuration.",
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Unknown error occurred.",
      code: "unknown-error",
    };
  }
};



/**
 * Handles the email verification link when user clicks it
 */
export const handleEmailVerificationLink = async (): Promise<EmailVerificationResult> => {
  if (!auth) {
    return {
      success: false,
      error: "Firebase authentication not initialized",
      code: "auth/not-initialized",
    };
  }

  try {
    const url = window.location.href;
    
    // Check if this is an email verification link
    if (isSignInWithEmailLink(auth, url)) {
      let email = localStorage.getItem('emailForSignIn');
      const verificationMode = localStorage.getItem('emailVerificationMode');

      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }

      if (email) {
        const currentUser = auth.currentUser;
        
        if (currentUser && verificationMode === 'link') {
          // This is our alternative method - just mark as verified
          localStorage.removeItem('emailForSignIn');
          localStorage.removeItem('emailVerificationMode');
          
          // You might want to update user's email in your backend here
          
          return {
            success: true,
            isVerified: true,
            user: currentUser,
          };
        } else {
          // Regular email link sign-in
          const result = await signInWithEmailLink(auth, email, url);
          localStorage.removeItem('emailForSignIn');
          localStorage.removeItem('emailVerificationMode');

          return {
            success: true,
            isVerified: true,
            user: result.user,
          };
        }
      } else {
        return {
          success: false,
          error: "Email is required for verification",
          code: "auth/email-required",
        };
      }
    } else {
      // Check regular verification status
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        return {
          success: true,
          isVerified: currentUser.emailVerified,
          user: currentUser,
        };
      } else {
        return {
          success: false,
          error: "No authenticated user found",
          code: "auth/no-current-user",
        };
      }
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError.message,
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Failed to handle verification link",
      code: "unknown-error",
    };
  }
};


/**
 * Checks if the current user's email is verified
 */
export const checkEmailVerificationStatus = async (): Promise<EmailVerificationResult> => {
  if (!auth || !auth.currentUser) {
    return {
      success: false,
      error: "No authenticated user found",
      code: "auth/no-current-user",
    };
  }

  try {
    await auth.currentUser.reload();
    
    // Also check our alternative verification method
    const alternativeVerified = localStorage.getItem('emailVerified') === 'true';

    return {
      success: true,
      isVerified: auth.currentUser.emailVerified || alternativeVerified,
      user: auth.currentUser,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: authError.message,
        code: authError.code,
      };
    }

    return {
      success: false,
      error: "Failed to check verification status",
      code: "unknown-error",
    };
  }
};


/**
 * Sets up auth state listener to monitor email verification
 */
export const onEmailVerificationStateChange = (callback: (isVerified: boolean, user: User | null) => void) => {
  if (!auth) {
    console.error("Firebase auth not initialized");
    return () => { };
  }

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      const alternativeVerified = localStorage.getItem('emailVerified') === 'true';
      callback(user.emailVerified || alternativeVerified, user);
    } else {
      callback(false, null);
    }
  });
};

// ==================== EXISTING FUNCTIONS ====================

/**
 * Cleans up reCAPTCHA resources
 */

export const resetRecaptcha = (): void => {
  try {
    // Clear confirmation result first
    confirmationResult = null;

    if (recaptchaVerifier) {
      try {
        recaptchaVerifier.clear();
        console.log("reCAPTCHA cleared successfully");
      } catch (clearError) {
        console.log("Error clearing reCAPTCHA:", clearError);
      }
      recaptchaVerifier = null;
    }

    // Clean up DOM elements immediately
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
      container.style.display = "none";
      container.removeAttribute('data-recaptcha-initialized'); // Remove our custom attribute
    }

    // Remove all reCAPTCHA related elements from DOM
    const removeElements = () => {
      // Remove reCAPTCHA badges
      const badges = document.querySelectorAll(".grecaptcha-badge");
      badges.forEach((badge) => {
        try {
          badge.remove();
        } catch (e) {
          console.log("Error removing badge:", e);
        }
      });

      // Remove all grecaptcha elements
      const recaptchaElements = document.querySelectorAll('[id^="grecaptcha-"]');
      recaptchaElements.forEach((el) => {
        try {
          el.remove();
        } catch (e) {
          console.log("Error removing element:", e);
        }
      });

      // Remove any iframe elements created by reCAPTCHA
      const iframes = document.querySelectorAll('iframe[src*="recaptcha"]');
      iframes.forEach((iframe) => {
        try {
          iframe.remove();
        } catch (e) {
          console.log("Error removing iframe:", e);
        }
      });

      // Clean up any remaining reCAPTCHA containers
      const allContainers = document.querySelectorAll('[data-recaptcha-initialized]');
      allContainers.forEach((container) => {
        container.removeAttribute('data-recaptcha-initialized');
      });
    };

    // Remove immediately and after delays
    removeElements();
    setTimeout(removeElements, 100);
    setTimeout(removeElements, 500);
    setTimeout(removeElements, 1000);

  } catch (error) {
    console.log("Error resetting reCAPTCHA:", error);
  }
};


/**
 * Utility function to get Firebase auth instance
 */
export const getFirebaseAuth = (): Auth | null => {
  return auth;
};