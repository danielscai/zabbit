import React from 'react';

interface ProTagProps {
    className?: string;
    variant?: 'default' | 'right';
}

const ProTag: React.FC<ProTagProps> = ({ className = '', variant = 'default' }) => {
    const baseStyles =
        'bg-[#2C1810] text-[#FFD700] px-3 py-1 rounded-full text-sm font-semibold shadow-lg border border-[#463229]';
    const variantStyles = variant === 'right' ? 'ml-auto' : '';

    return (
        <div className={`${baseStyles} ${variantStyles} ${className}`} data-oid="eeq-z24">
            PRO
        </div>
    );
};

export default ProTag;
