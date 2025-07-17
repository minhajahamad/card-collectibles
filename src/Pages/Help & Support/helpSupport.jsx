import React from 'react';
import NavBar from '../../Components/NavBar/navBar';
import SideBar from '../../Components/Sidebar/sideBar';

const HelpSupport = () => {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="flex">
        <SideBar />
        <div
          style={{ overflowY: 'scroll', scrollbarWidth: 'none' }}
          className="w-[75%] h-[600px] border border-[#DEDEDE] rounded-[14px] shadow-[0_0_17px_0_#00000014]  mt-[60px] font-sans xl:px-10 xl:pt-8 overflow-y-auto "
        >
          <p className="text-[35px] font-bold text-[#464646]">Privacy Policy</p>
          <p className="text-[16px] font-light text-[#777] mb-4">
            Last Updated: 20/06/2028
          </p>
          <p className="mb-3">
            At Company, your privacy is important to us. This Privacy Policy
            outlines how we collect, use, and protect your personal information.
          </p>

          <div className="text-[16px] leading-[26px] space-y-1">
            <p>
              <strong>Information We Collect:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong className="text-[#464646]">
                  Personal Information:
                </strong>{' '}
                Name, email address, phone number
              </li>
              <li>
                <strong className="text-[#464646]">Usage Data:</strong> Pages
                visited, time spent, clicks, and device info
              </li>
              <li>
                <strong className="text-[#464646]">Credit Activity:</strong>{' '}
                Credits earned, redeemed, and remaining balance
              </li>
            </ul>

            <p>
              <strong>How We Use Your Information:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>To provide and improve our services</li>
              <li>To notify you about updates or promotional offers</li>
              <li>To track and manage credit usage and redemptions</li>
            </ul>

            <p>
              <strong>Data Protection:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>All data is stored on secure servers</li>
              <li>
                We use encryption and authentication tools to protect your data
              </li>
            </ul>

            <p>
              <strong>Third-Party Sharing:</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>We never sell your data</li>
              <li>
                Data may be shared with third parties only to operate and
                improve our services (e.g., cloud hosting or analytics)
              </li>
            </ul>

            <p>
              <strong>Cookies:</strong> We use cookies to enhance your browsing
              experience and track usage for analytics.
            </p>

            <p>
              <strong>Your Rights:</strong> You can request access, deletion, or
              correction of your personal data at any time.
            </p>

            <p>
              For questions, contact us at:{' '}
              <a
                href="mailto:support@yourwebsitename.com"
                className="text-blue-500 underline"
              >
                support@yourwebsitename.com
              </a>
            </p>

            <hr className="border-t border-[#ccc] my-6" />

            <p className="text-[28px] font-bold text-[#464646]">FAQs</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Q1: What are credits?</strong>
                <br />
                A: Credits are virtual points you earn on our platform, which
                can be redeemed for products, services, or offers.
              </li>
              <li>
                <strong>Q2: How can I earn credits?</strong>
                <br />
                A: You can earn credits by signing up, referring friends,
                completing activities, or during promotional campaigns.
              </li>
              <li>
                <strong>Q3: How can I redeem my credits?</strong>
                <br />
                A: Go to your dashboard, click “Redeem Credits.” You'll see
                available options to use them.
              </li>
              <li>
                <strong>Q4: Do credits expire?</strong>
                <br />
                A: Yes, credits are valid for 12 months from the date of issue
                unless otherwise specified.
              </li>
              <li>
                <strong>Q5: Can I transfer credits?</strong>
                <br />
                A: Currently, credits are non-transferable and can only be used
                by the account that earned them.
              </li>
              <li>
                <strong>Q6: I didn't receive credits. What should I do?</strong>
                <br />
                A: Reach out to our support team with your account details, and
                we’ll help you resolve the issue.
              </li>
            </ul>

            <hr className="border-t border-[#ccc] my-6" />

            <p className="text-[28px] font-bold text-[#464646]">
              Terms and Conditions
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Effective Date:</strong> [Insert Date]
              </li>
              <li>
                <strong>1. User Eligibility:</strong> You must be 18 years or
                older to use the service.
              </li>
              <li>
                <strong>2. Account Responsibility:</strong> You're responsible
                for keeping your account secure and for all activity under it.
              </li>
              <li>
                <strong>3. Credit System:</strong> Credits earned are non-cash
                and non-transferable. We reserve the right to change the credit
                policy at any time.
              </li>
              <li>
                <strong>4. Misuse and Fraud:</strong> Misuse, fraud, or
                manipulation of the credit system may result in suspension or
                termination of your account.
              </li>
              <li>
                <strong>5. Changes to Terms:</strong> We may update these terms
                at any time. Continued use = agreement to the new terms.
              </li>
              <li>
                <strong>6. Governing Law:</strong> These terms are governed by
                the laws of [Your Country/Region].
              </li>
            </ul>

            <hr className="border-t border-[#ccc] my-6" />

            <p className="text-[28px] font-bold text-[#464646]">
              User Bonus Policy
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Overview:</strong> This policy explains how users earn
                promotional credits.
              </li>
              <li>
                <strong>1. Welcome Bonus:</strong> New users receive a one-time
                bonus (e.g. 100 credits) upon signing up.
              </li>
              <li>
                <strong>2. Referral Bonus:</strong> Refer a friend and earn
                (e.g. 50 credits) once they complete their first activity.
              </li>
              <li>
                <strong>3. Bonus Activity:</strong> Users may receive bonus
                credits for activities like surveys, quizzes, etc.
              </li>
              <li>
                <strong>4. Bonus Expiry:</strong> Bonuses are valid for 90 days
                from when they are added.
              </li>
              <li>
                <strong>5. Abuse Prevention:</strong> If abuse or fraud is
                found, bonuses may be revoked and account suspended.
              </li>
              <li className="mb-3">
                <strong>6. Policy Updates:</strong> We reserve the right to
                update this policy anytime with/without notice.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
