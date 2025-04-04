import React from "react";
import PropTypes from "prop-types";

export const PlaceholderBanner = ({
  title,
  description,
  emoji = "🚧",
  ariaLabel = "Feature preview",
  footnote,
}) => {
  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div
        className="text-center text-muted px-3"
        role="status"
        aria-label={ariaLabel}
      >
        <div aria-live="polite">
          <h2 className="fs-3 mb-3">
            {emoji} {title}
          </h2>
          <p className="lead mb-0">{description}</p>
          {footnote && <div className="mt-3 text-muted small">{footnote}</div>}
        </div>
      </div>
    </div>
  );
};

PlaceholderBanner.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  ariaLabel: PropTypes.string,
  footnote: PropTypes.string,
};
