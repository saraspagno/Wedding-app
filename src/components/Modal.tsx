import React from 'react';
import RSVPForm from './RSVPForm';
import { GuestGroup, ModalState } from '../types/interfaces';
import { BusIcon, HeartCrackIcon, PartyIcon } from './icons';

interface ModalProps {
    modalState: ModalState;
    error: boolean;
    guestGroup: GuestGroup | null;
    onClose: () => void;
    onRSVPComplete: (updatedGroup: GuestGroup) => void;
}

// Reusable Close Button Component
const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700 font-medium"
    >
        Close
    </button>
);

// Reusable Guest List Component
const GuestList: React.FC<{ guestGroup: GuestGroup }> = ({ guestGroup }) => (
    <div className="space-y-3">
        {guestGroup.guests.map((guest, index) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-200">
                <div className="grid grid-cols-1 gap-2">
                    <div className="text-left">
                        <span className="font-medium text-gray-900">{guest.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${guest.coming
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                            {guest.coming ? 'Coming' : 'Not Coming'}
                        </span>
                        {guest.coming && guest.busTime !== 'none' && (
                            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                <BusIcon className="text-gray-600" size="sm" />
                                {guest.busTime}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const Modal: React.FC<ModalProps> = ({
    modalState,
    error,
    guestGroup,
    onClose,
    onRSVPComplete
}) => {
    const renderModalContent = () => {
        switch (modalState) {
            case ModalState.ERROR:
                return (
                    <div className="flex flex-col items-center">
                        <p className="text-gray-700 text-center mb-4">
                            Please re-click on the link sent to you by the host.
                        </p>
                        <CloseButton onClick={onClose} />
                    </div>
                );

            case ModalState.RSVP:
                return guestGroup ? (
                    <RSVPForm
                        guestGroup={guestGroup}
                        onRSVPComplete={onRSVPComplete}
                        onClose={onClose}
                    />
                ) : null;

            case ModalState.THANK_YOU:
                return (
                    <div className="flex flex-col sm:mx-0">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <PartyIcon className="text-gray-600" size="lg" />
                            </div>
                            <p className="text-lg text-gray-600">
                                We look forward to celebrating with you
                            </p>
                        </div>

                        <div className="mb-8">
                            {guestGroup && <GuestList guestGroup={guestGroup} />}
                        </div>

                        <CloseButton onClick={onClose} />
                    </div>
                );

            case ModalState.SORRY:
                return (
                    <div className="flex flex-col sm:mx-0">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <HeartCrackIcon className="text-gray-600" size="lg" />
                            </div>
                            <p className="text-lg text-gray-600">
                                We are sorry you can't make it
                            </p>
                        </div>
                        <div className="mb-8">
                            {guestGroup && <GuestList guestGroup={guestGroup} />}
                        </div>

                        <CloseButton onClick={onClose} />
                    </div>
                );

            default:
                return null;
        }
    };

    if (modalState === ModalState.NONE) {
        return null;
    }

    return (
        <div className="shadow-lg fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-20 pt-16">
            <div className="bg-white p-6 w-full mx-2 max-w-md max-h-[calc(100vh-8rem)] overflow-y-auto flex flex-col rounded-lg mt-4">
                {renderModalContent()}
            </div>
        </div>
    );
};

export default Modal; 