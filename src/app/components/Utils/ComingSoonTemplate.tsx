import React from "react";

interface ComingSoonTemplateProps {
  title?: string;
  message?: string;
}

const ComingSoonTemplate: React.FC<ComingSoonTemplateProps> = ({
  title = "Coming Soon",
  message = "We're working hard to bring you something amazing. Stay tuned!",
}) => (
  <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
    <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
      {title}
    </h1>
    <p className="text-white text-lg mb-8">
      {message}
    </p>
  </div>
);

export default ComingSoonTemplate;