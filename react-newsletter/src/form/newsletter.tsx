import React, { useState } from "react";
import LoadingIcon from "../icons/loading";
import AlertSuccess from "../alerts/success";
import AlertError from "../alerts/error";
import { padNumber } from "../utils/padNumber";

type Props = {
  handleSubscribe: (email: string) => void;
  isSubmitSuccess?: boolean;
  isSubmitError?: boolean;
  isSubmitting?: boolean;
  newsletterName: string;
  totalIssues: number;
  totalSubscribers: number;
};

const NewsletterForm = ({
  handleSubscribe,
  isSubmitError = false,
  isSubmitSuccess = false,
  isSubmitting = false,
  newsletterName,
  totalIssues,
  totalSubscribers,
}: Props) => {
  const [email, setEmail] = useState<string>('');

  const onSubscribeButtonClick = async () => {
    if (!email) {
      return;
    }

    await handleSubscribe(email);

    if (isSubmitSuccess) {
      setEmail('');
    }
  };

  return (
    <div className="w-full h-screen flex items-center bg-gray-200">
      <div className="px-12 py-10 w-1/2 mx-auto min-h-1/2 my-auto bg-white rounded-lg shadow-md">
        { isSubmitSuccess && <AlertSuccess /> }
        { isSubmitError && <AlertError /> }
        <h2 className="font-bold text-3xl">{newsletterName}</h2>
        <div className="text-gray-700 mt-8 mb-2">
          Subscribe to the newsletter to get updates about new contents and news.
        </div>
        <div className="flex items-center">
          <label htmlFor="email" className="flex-1">
            <input
              type="email"
              className="mt-1 block w-10/12 rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              autoComplete="off"
              id="email"
              placeholder="sundar@google.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            className="flex items-center px-6 h-[42px] text-sm font-medium leading-5 text-white bg-blue-500 border border-transparent rounded-lg focus:outline-none"
            onClick={onSubscribeButtonClick}
          >
            { isSubmitting && <LoadingIcon />}
            Subscribe
          </button>
        </div>
        <div className="mt-4 text-gray-700">
          Join {padNumber(totalSubscribers)} subscribers – {padNumber(totalIssues)} issues
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
