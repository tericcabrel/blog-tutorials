import React from 'react';
import NewsletterForm from "./form/newsletter";

const App = () => {
  const handleSubscribe = async (email: string) => {
    console.log(email);
  }

  return (
    <NewsletterForm
      isSubmitting={false}
      isSubmitError={false}
      isSubmitSuccess={false}
      handleSubscribe={handleSubscribe}
      newsletterName={"Newsletter name"}
      totalIssues={0}
      totalSubscribers={0}
    />
  );
}

export default App;
