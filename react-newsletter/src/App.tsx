import React from 'react';
import NewsletterForm from "./form/newsletter";
import { useAccountInfo } from "./hooks/account-info";

const App = () => {
  const { data } = useAccountInfo();

  const handleSubscribe = async (email: string) => {
    console.log(email);
  };

  return (
    <NewsletterForm
      isSubmitting={false}
      isSubmitError={false}
      isSubmitSuccess={false}
      handleSubscribe={handleSubscribe}
      newsletterName={data?.name || "Newsletter name"}
      totalIssues={0}
      totalSubscribers={0}
    />
  );
}

export default App;
