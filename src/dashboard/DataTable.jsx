import React from 'react';
import { motion } from 'framer-motion';
import { FiMoreVertical } from 'react-icons/fi';

const DataTable = ({
    data,
    columns,
    actions,
    isLoading,
    emptyState,
    title,
    description
}) => {
    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    const TableSkeleton = () => (
        <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-t-lg mb-4" />
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex space-x-4 mb-4">
                    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
                </div>
            ))}
        </div>
    );

    const EmptyState = ({ message, icon: Icon }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
        >
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 mb-4">
                <Icon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No data available
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                {message}
            </p>
        </motion.div>
    );

    if (isLoading) return <TableSkeleton />;

    if (!data.length && emptyState) {
        return <EmptyState {...emptyState} />;
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
            <div className="overflow-x-auto">
                <motion.table
                    className="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
                    variants={tableVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <thead className="bg-gray-50 dark:bg-gray-900/50">
                        <tr>
                            {columns.map((column, i) => (
                                <th
                                    key={i}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                            {actions && (
                                <th className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {data.map((item, index) => (
                            <motion.tr
                                key={index}
                                variants={rowVariants}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            >
                                {columns.map((column, i) => (
                                    <td
                                        key={i}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
                                    >
                                        {column.render ? column.render(item) : item[column.accessor]}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            {actions.map((action, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => action.onClick(item)}
                                                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm ${action.variant === 'danger'
                                                        ? 'text-white bg-red-600 hover:bg-red-700'
                                                        : action.variant === 'success'
                                                            ? 'text-white bg-green-600 hover:bg-green-700'
                                                            : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300'
                                                        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors`}
                                                >
                                                    {action.icon && (
                                                        <action.icon className="-ml-0.5 mr-2 h-4 w-4" />
                                                    )}
                                                    {action.label}
                                                </button>
                                            ))}
                                            <button className="text-gray-400 hover:text-gray-500">
                                                <FiMoreVertical className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </motion.tr>
                        ))}
                    </tbody>
                </motion.table>
            </div>
        </div>
    );
};

export default DataTable;
