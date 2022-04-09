const AlertError = () => {
  return (
    <div className="flex bg-red-100 rounded-lg p-4 mb-4 text-sm text-red-700" role="alert">
      <svg className="w-5 h-5 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <span className="font-medium">Error:</span> failed to subscribe to the newsletter.
      </div>
    </div>
  );
};

export default AlertError;
