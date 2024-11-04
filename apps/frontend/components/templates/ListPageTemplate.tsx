import React, { ReactNode } from "react";

interface IProps {
  title: string;
  actionButtons?: ReactNode;
  filters?: ReactNode;
  content: ReactNode;
  bulkActions?: ReactNode;
}

const ListPageTemplate: React.FC<IProps> = ({
  title,
  actionButtons,
  filters,
  content,
  bulkActions,
}) => {
  return (
    <div className="flex flex-col p-6 justify-center my-4 mx-4 rounded-lg shadow-lg">
      <div className="shadow p-4 sticky top-0 z-10 rounded-lg">
        <div className="md:flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {actionButtons && (
            <div className="mt-4 md:mt-0">{actionButtons}</div>
          )}
        </div>
        {filters && <div className="mb-4">{filters}</div>}
        {bulkActions && <div className="mb-4">{bulkActions}</div>}
      </div>
      <div className="flex-1 overflow-y-auto bg-background mt-4">
        {content}
      </div>
    </div>
  );
};

export default ListPageTemplate;
