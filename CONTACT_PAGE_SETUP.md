# Contact Page Setup Guide

This guide will help you set up the production-grade Contact page with EmailJS integration.

## 📋 Overview

The Contact page includes:
- Premium glassmorphism design with smooth animations
- Full form validation (required fields, email format)
- Anti-spam protection (honeypot field + 5-second cooldown)
- EmailJS integration for email delivery
- Toast notifications for success/error feedback
- Responsive design (mobile-first)
- Accessibility features (ARIA labels, semantic HTML)

## 🚀 Setup Instructions

### 1. EmailJS Configuration

#### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Log in to your dashboard

#### Step 2: Create Email Service
1. Click on "Email Services" in the sidebar
2. Click "Create New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
   - For Gmail: Use "Gmail" service
   - Follow the authentication steps
4. Copy your **Service ID** (looks like `service_xxxxxxxxxxxxx`)

#### Step 3: Create Email Template
1. Click on "Email Templates" in the sidebar
2. Click "Create New Template"
3. Fill in the template with the following variables (IMPORTANT):
   ```
   From Name: {{from_name}}
   From Email: {{from_email}}
   Subject: {{subject}}
   Message: {{message}}
   ```
4. Customize the email layout as needed
5. Save the template
6. Copy your **Template ID** (looks like `template_xxxxxxxxxxxxx`)

#### Step 4: Get Public API Key
1. Click on "Account" in the sidebar
2. Copy your **Public Key** (looks like `xxxxxxxxxxxxxxxxxxxxx`)

### 2. Environment Variables Configuration

1. In your project root, create or update `.env.local`:
   ```
   VITE_EMAIL_SERVICE_ID=service_xxxxxxxxxxxxx
   VITE_EMAIL_TEMPLATE_ID=template_xxxxxxxxxxxxx
   VITE_EMAIL_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxx
   ```

2. Replace the values with your actual IDs from EmailJS

3. **Important**: Never commit `.env.local` to version control (it's already in `.gitignore`)

### 3. Update Contact Information

Edit [src/Sections/Contact.jsx](src/Sections/Contact.jsx):

#### Update Email Address
```jsx
const contactInfo = [
  {
    icon: FiMail,
    label: "Email",
    value: "your-email@example.com",  // Update this
    href: "mailto:your-email@example.com",
  },
  // ...
];
```

#### Update Social Links
```jsx
const socialLinks = [
  {
    icon: FiGithub,
    label: "GitHub",
    href: "https://github.com/your-username",  // Update this
    color: "hover:text-gray-400",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/your-profile",  // Update this
    color: "hover:text-blue-400",
  },
  {
    icon: FiExternalLink,
    label: "Portfolio",
    href: "https://your-portfolio.com",  // Update this
    color: "hover:text-cyan-400",
  },
];
```

#### Update Resume Download Link
```jsx
<motion.a
  href="https://your-resume-link.com/resume.pdf"  // Update this
  download
  // ...
>
```

## 📁 File Structure

```
src/
├── Components/
│   ├── ContactInput.jsx      # Reusable input component
│   └── Toast.jsx             # Toast notification component
├── Sections/
│   └── Contact.jsx           # Main contact section
└── hooks/
    └── useContactForm.js     # Custom form hook with validation
```

## 🎨 Features Explained

### Form Validation
- **Required Fields**: Name, Email, Subject, Message
- **Email Validation**: Checks for valid email format
- **Min Length**: Name (2 chars), Subject (3 chars), Message (10 chars)
- **Real-time Errors**: Users see inline error messages as they type

### Anti-Spam Protection
1. **Honeypot Field**: Hidden field that should remain empty. If filled, submission is rejected
2. **Cooldown Period**: Users must wait 5 seconds between submissions
3. **Frontend Rate Limiting**: Prevents multiple rapid submissions

### UX Features
- **Loading State**: Button shows spinner and "Sending..." text
- **Auto-disable**: Button is disabled while sending to prevent double-submission
- **Toast Notifications**: 
  - Success toast auto-dismisses after 3 seconds
  - Error toast stays until manually closed
- **Form Reset**: Form clears automatically after successful submission

### Design Features
- **Glassmorphism**: Semi-transparent cards with backdrop blur
- **Gradient Backgrounds**: Soft cyan and purple gradients
- **Smooth Animations**: 
  - Fade-in and slide-up on page load
  - Hover effects on cards and buttons
  - Input focus glow effect
  - Pulsing availability badge
- **Responsive**: Perfect spacing on mobile, tablet, and desktop

## 🔄 How the Form Works

1. **User fills form** → Real-time validation shows errors
2. **User submits** → Hook validates all fields
3. **Honeypot check** → Spam filter validation
4. **Cooldown check** → Prevents spam submissions
5. **EmailJS sends** → Email delivered to your inbox
6. **Success toast** → User sees confirmation
7. **Form resets** → Ready for next message

## ⚙️ Customization

### Change Colors
Update Tailwind color classes in `Contact.jsx`:
```jsx
// Change from cyan/purple to blue/green
from-blue-400 via-teal-500 to-emerald-600
```

### Adjust Cooldown Period
Edit [src/hooks/useContactForm.js](src/hooks/useContactForm.js):
```jsx
const COOLDOWN_PERIOD = 5000; // Change to desired milliseconds
```

### Modify Form Fields
You can add more fields by:
1. Adding field to form state in `useContactForm.js`
2. Adding validation logic
3. Adding input component to Contact.jsx
4. Updating EmailJS template to include new field

### Change Messages
All user-facing messages can be updated in:
- `useContactForm.js` - Validation messages, toast messages
- `Contact.jsx` - Section text, placeholder text
- `ContactInput.jsx` - Field labels, error messages

## 🧪 Testing the Form

1. **Local Testing**:
   ```bash
   npm run dev
   ```
   Navigate to the Contact section and test the form

2. **Test Error Validation**:
   - Try submitting empty form
   - Try invalid email format
   - Try very short messages

3. **Test Anti-Spam**:
   - Submit a valid message
   - Try submitting again immediately
   - Wait 5 seconds and submit again

4. **Test Email Delivery**:
   - Submit a real message
   - Check your email inbox
   - Verify all fields are populated correctly in the email

## 🐛 Troubleshooting

### "EmailJS configuration is incomplete"
- Check that all three environment variables are set
- Verify no typos in variable names
- Restart dev server after adding env variables

### Emails not being delivered
- Verify Service ID and Template ID are correct
- Check that email template includes all variable placeholders
- Check spam folder
- Verify email service is properly connected in EmailJS dashboard

### Form not submitting with valid data
- Check browser console for errors
- Verify environment variables are loaded (console.log in useContactForm)
- Ensure honeypot field is actually hidden

### Toast notifications not showing
- Verify Toast component is imported
- Check that toast state is being set correctly
- Verify position is visible in viewport (`bottom-6 left-6`)

## 📱 Mobile Optimization

The page is fully responsive:
- **Mobile** (<640px): Single column layout, optimized spacing
- **Tablet** (640px-1024px): 2-column layout, adjusted padding
- **Desktop** (>1024px): 3-column grid with form spanning 2 columns

## ♿ Accessibility

- Semantic HTML form elements
- ARIA labels and descriptions
- Error messages linked to inputs via `aria-describedby`
- Keyboard navigation support
- Focus indicators on all interactive elements
- Color contrast meets WCAG standards

## 🔐 Security Notes

- Public API key is intentionally public (that's why it's in imports)
- Sensitive data (Service ID, Template ID) should never be exposed client-side
- Honeypot and cooldown provide basic spam protection
- For production, consider backend validation
- Never store sensitive data in client-side code

## 📚 Dependencies

- `@emailjs/browser` - Email sending
- `framer-motion` - Animations
- `react-icons/fi` - Feather Icons
- `tailwindcss` - Styling (already in project)

## 🚀 Production Checklist

- [ ] EmailJS account created and configured
- [ ] Environment variables set in `.env.local`
- [ ] Contact email updated
- [ ] Social links updated
- [ ] Resume download URL updated
- [ ] Email template customized with branding
- [ ] Form tested end-to-end
- [ ] Mobile responsiveness verified
- [ ] Toast notifications tested
- [ ] Error handling tested
- [ ] Spam protection working
- [ ] Email delivery verified
- [ ] Domain added to EmailJS safe sender list (if applicable)

## 📞 Support

For EmailJS issues: https://www.emailjs.com/docs/
For Framer Motion: https://www.framer.com/motion/
For Tailwind CSS: https://tailwindcss.com/docs

---

**Last Updated**: March 2026
**Status**: Production Ready ✅
