import React from 'react';
import NewsletterForm from "./form/newsletter";
import { useAccountInfo } from "./hooks/account-info";
import {useSubscribers} from "./hooks/subscribers";

const App = () => {
  const { data } = useAccountInfo();
  const { data: subscribersData } = useSubscribers();

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
      totalSubscribers={subscribersData?.total_subscribers ?? 0}
    />
  );
}

export default App;
