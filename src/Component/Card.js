import React from "react";

const Card = ({ title, selfText, url, score }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 p-5 flex flex-col">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
        {title}
      </h2>

      {selfText ? (
        <div
          className="text-sm text-gray-700 dark:text-gray-300 mb-4 prose max-w-full line-clamp-3"
          // dangerouslySetInnerHTML={{ __html: selfText }}
        >
          {" "}
          {selfText}{" "}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">No self text</p>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <span className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <svg
            className="w-4 h-4 text-yellow-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>Score: {score ?? 0}</span>
        </span>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Open
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </article>
  );
};

export default Card;
