import React from "react";
import { Trash2, Ban, Eye } from "lucide-react";

const Table = ({
  headers,
  data,
  renderRow,
  className = "",
  emptyMessage = "No data available",
  tableClassName = "",
  theadClassName = "",
  tbodyClassName = "",
  showActions = false,
  actions = [],
  onAction = () => {},
}) => {
  const defaultActions = [
    {
      label: "View",
      icon: Eye,
      color: "text-zinc-600 hover:text-black",
      action: "view",
    },
    {
      label: "Suspend",
      icon: Ban,
      color: "text-zinc-600 hover:text-orange-600",
      action: "suspend",
    },
    {
      label: "Delete",
      icon: Trash2,
      color: "text-zinc-600 hover:text-red-600",
      action: "delete",
    },
  ];

  const availableActions = actions.length > 0 ? actions : defaultActions;

  const handleActionClick = (action, item, event) => {
    event.stopPropagation();
    onAction(action, item);
  };

  const renderActionButtons = (item, index) => {
    if (!showActions) return null;

    return (
      <td className="px-8 py-5 text-right">
        <div className="flex items-center justify-end gap-2">
          {availableActions.map((action, actionIndex) => {
            const Icon = action.icon;
            return (
              <button
                key={actionIndex}
                className={`p-2 rounded transition-colors ${action.color}`}
                onClick={(e) => handleActionClick(action.action, item, e)}
                title={action.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      </td>
    );
  };

  
  const tableHeaders = showActions
    ? [...headers, { label: "Actions", align: "right" }]
    : headers;

  return (
    <table
      className={`w-full text-left border-collapse bg-white border border-zinc-200 ${tableClassName} ${className}`}
    >
      <thead
        className={`border-b border-zinc-200 bg-zinc-50/50 ${theadClassName}`}
      >
        <tr>
          {tableHeaders.map((header, index) => (
            <th
              key={index}
              className={`px-8 py-5 text-label-caps uppercase tracking-widest font-black text-[10px] ${
                header.align === "right" ? "text-right" : ""
              }`}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={`divide-y divide-zinc-100 ${tbodyClassName}`}>
        {data.length > 0 ? (
          data.map((item, index) => {
            if (showActions && renderRow) {
              
              
              const CustomRow = renderRow(item, index);
              return React.cloneElement(CustomRow, {}, [
                ...CustomRow.props.children,
                renderActionButtons(item, index),
              ]);
            } else if (renderRow) {
              return renderRow(item, index);
            } else {
              
              return (
                <tr key={index} className="hover:bg-zinc-50 transition-colors">
                  {headers.map((header, headerIndex) => (
                    <td key={headerIndex} className="px-8 py-5 text-sm">
                      {item[header.key] || ""}
                    </td>
                  ))}
                  {showActions && renderActionButtons(item, index)}
                </tr>
              );
            }
          })
        ) : (
          <tr>
            <td
              colSpan={tableHeaders.length}
              className="px-8 py-12 text-center text-zinc-500"
            >
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
