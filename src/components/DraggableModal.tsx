import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, GripHorizontal, RotateCcw } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface DraggableModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  icon?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  headerActions?: React.ReactNode;
  maxWidthClass?: string; // e.g. 'max-w-lg', 'max-w-2xl', 'max-w-5xl'
  maxHeightClass?: string; // e.g. 'max-h-[85vh]', 'h-[92vh]'
  ariaLabelledBy?: string;
}

export const DraggableModal: React.FC<DraggableModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  subtitle,
  children,
  footer,
  headerActions,
  maxWidthClass = 'max-w-lg',
  maxHeightClass = 'max-h-[90vh]',
  ariaLabelledBy = 'draggable-modal-title'
}) => {
  const { t } = useLanguage();
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number }>({
    mouseX: 0,
    mouseY: 0,
    posX: 0,
    posY: 0
  });
  const modalRef = useRef<HTMLDivElement>(null);

  // Reset position when modal opens
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Mouse & Touch Drag Handlers
  const handleDragStart = (clientX: number, clientY: number) => {
    // Only enable dragging on screens >= 640px to prevent mobile layout clipping & erratic touch jump
    if (typeof window !== 'undefined' && window.innerWidth < 640) return;
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      posX: position.x,
      posY: position.y
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    handleDragStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const deltaY = e.clientY - dragStartRef.current.mouseY;

    const maxBoundX = Math.max(80, window.innerWidth / 2 - 40);
    const maxBoundY = Math.max(80, window.innerHeight / 2 - 40);

    const newX = Math.min(Math.max(dragStartRef.current.posX + deltaX, -maxBoundX), maxBoundX);
    const newY = Math.min(Math.max(dragStartRef.current.posY + deltaY, -maxBoundY), maxBoundY);

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.mouseX;
    const deltaY = e.touches[0].clientY - dragStartRef.current.mouseY;

    const maxBoundX = Math.max(80, window.innerWidth / 2 - 40);
    const maxBoundY = Math.max(80, window.innerHeight / 2 - 40);

    const newX = Math.min(Math.max(dragStartRef.current.posX + deltaX, -maxBoundX), maxBoundX);
    const newY = Math.min(Math.max(dragStartRef.current.posY + deltaY, -maxBoundY), maxBoundY);

    setPosition({ x: newX, y: newY });
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150 overflow-hidden"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out'
        }}
        className={`bg-white dark:bg-[#121217] rounded-[24px] sm:rounded-[36px] w-full shadow-[0_24px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col ${maxWidthClass} ${maxHeightClass} animate-in zoom-in-95 duration-150 relative ${
          isDragging ? 'select-none shadow-[0_28px_80px_rgba(184,102,27,0.25)] ring-2 ring-[#B8661B]' : ''
        }`}
      >
        {/* Draggable Title Bar / Header */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="px-4 sm:px-6 py-3.5 sm:py-4.5 bg-[#FAF8F5] dark:bg-[#15151C] flex items-center justify-between shrink-0 sm:cursor-grab sm:active:cursor-grabbing select-none group transition-colors hover:bg-[#F5F2EB] dark:hover:bg-[#1A1A24] min-w-0"
          title="Click and drag to move panel"
        >
          {/* Left: Drag grip indicator + Icon + Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
            <div 
              className="text-[#888888] dark:text-[#A1A1AA] group-hover:text-[#B8661B] dark:group-hover:text-[#EAB308] transition-colors hidden sm:flex items-center shrink-0 cursor-grab"
              aria-hidden="true"
            >
              <GripHorizontal className="w-4 h-4" />
            </div>

            {icon && (
              <div className="shrink-0 flex items-center">
                {icon}
              </div>
            )}

            <div className="min-w-0">
              <h3 id={ariaLabelledBy} className="text-sm sm:text-base font-[800] text-[#080808] dark:text-white font-display truncate">
                {title}
              </h3>
              {subtitle && (
                <div className="text-[10px] sm:text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] truncate">
                  {subtitle}
                </div>
              )}
            </div>
          </div>

          {/* Right: Reset Position button, Header Actions, and Close button */}
          <div 
            className="flex items-center gap-1.5 sm:gap-2 shrink-0"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {(position.x !== 0 || position.y !== 0) && (
              <button
                onClick={() => setPosition({ x: 0, y: 0 })}
                className="p-1 rounded-[8px] text-[#666666] dark:text-[#A1A1AA] hover:text-[#080808] dark:hover:text-white hover:bg-[#EFECE6] dark:hover:bg-[#20202A] transition-colors text-[11px] font-mono hidden sm:flex items-center gap-1 px-2 cursor-pointer"
                title={t.common.drag_hint}
                aria-label={t.common.center}
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t.common.center}</span>
              </button>
            )}

            {headerActions}

            {/* Close Button Icon */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-[12px] text-[#666666] dark:text-[#A1A1AA] hover:text-[#080808] dark:hover:text-white hover:bg-[#EFECE6] dark:hover:bg-[#20202A] active:bg-[#D8D1C4] transition-colors cursor-pointer ml-0.5 sm:ml-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8661B]"
              aria-label={t.common.close}
            >
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto min-h-0 min-w-0">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div 
            className="shrink-0"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
