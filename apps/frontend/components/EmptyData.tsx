import Image from 'next/image';
import React from 'react';

const EmptyData: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="shadow-md rounded-lg p-6 max-w-sm flex flex-col items-center">
                <Image
                    src='/images/no-data.png'
                    width={200}
                    height={200}
                    alt='no-data-image'
                />
                <h3 className="text-gray-700 text-xl font-semibold text-center">
                    No data available
                </h3>
                <p className="text-gray-500 mt-2 text-center">
                    Please check back later or add some new data.
                </p>
            </div>
        </div>
    );
};

export default EmptyData;
