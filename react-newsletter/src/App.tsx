import React from 'react';
import NewsletterForm from "./form/newsletter";
import { useAccountInfo } from "./hooks/account-info";
import { useSubscribers } from "./hooks/subscribers";
import { useBroadcasts } from "./hooks/broadcasts";
import { useSubscribe } from "./hooks/subscribe";

const FORM_ID = "2877475";

const App = () => {
  const { data } = useAccountInfo();
  const { data: subscribersData } = useSubscribers();
  const { data: broadcastsData } = useBroadcasts();
  const { mutate, isLoading, isSuccess, isError } = useSubscribe(FORM_ID);

  const handleSubscribe = async (email: string) => {
    await mutate({ email });
  };

  return (
    <NewsletterForm
      isSubmitting={isLoading}
      isSubmitError={isError}
      isSubmitSuccess={isSuccess}
      handleSubscribe={handleSubscribe}
      newsletterName={data?.name || "Newsletter name"}
      totalIssues={broadcastsData?.broadcasts.length ?? 0}
      totalSubscribers={subscribersData?.total_subscribers ?? 0}
    />
  );
}

export default App;
