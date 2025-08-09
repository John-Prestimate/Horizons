import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const WidgetPage = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('user');

  const widgetUrl = `https://www.prestimate.io/Mapview/index.html?user=${userId}`;

  return (
    <>
      <Helmet>
        <title>Prestimate Widget</title>
        <meta name="description" content="View your Prestimate widget." />
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        {userId ? (
          <iframe
            src={widgetUrl}
            title="Prestimate Widget"
            className="w-full h-[90vh] max-w-[1200px] border-0 rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Widget Not Found</h1>
            <p className="text-gray-600">
              Please provide a user ID in the URL to load the widget.
              <br />
              Example: /widget?user=YOUR_USER_ID
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WidgetPage;