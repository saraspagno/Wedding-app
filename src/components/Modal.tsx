import React, { useEffect } from 'react';
import RSVPForm from './RSVPForm';
import { GuestGroup, ModalState } from '../types/interfaces';
import { FaBus, FaHeartBroken } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
import confetti from 'canvas-confetti';

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
        className="w-full bg-blue-600 text-white py-2 sm:py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
    >
        Close
    </button>
);

// Reusable Guest List Component
const GuestList: React.FC<{ guestGroup: GuestGroup }> = ({ guestGroup }) => (
    <div className="space-y-3">
        {guestGroup.guests.map((guest, index) => (
            <div key={index} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="grid grid-cols-1 gap-2">
                    <div className="text-left">
                        <span className="font-semibold text-gray-900">{guest.fullName}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${guest.coming
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200'
                            }`}>
                            {guest.coming ? 'Coming' : 'Not Coming'}
                        </span>
                        {guest.coming && (
                            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full border border-gray-200 shadow-sm">
                                <FaBus className="text-gray-600 w-4 h-4" />
                                {guest.busTime === 'none' ? 'No' : guest.busTime}
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
    // Trigger confetti when Thank You modal is shown
    useEffect(() => {
        if (modalState === ModalState.THANK_YOU && guestGroup) {
            const atLeastOneComing = guestGroup.guests.some(guest => guest.coming);
            if (atLeastOneComing) {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']
                });
            }
        }
    }, [modalState, guestGroup]);

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
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                                Thank you
                                <GiPartyPopper className="text-gray-600 w-6 h-6" />
                            </h2>
                            <p className="text-lg text-gray-600 font-medium">
                                We look forward to celebrating with you!
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
                            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
                                We will miss you
                                <FaHeartBroken className="text-gray-600 w-6 h-6" />
                            </h2>
                            <p className="text-lg text-gray-600 font-medium mb-3">
                                We are sorry you can't make it!
                            </p>
                            <p className="text-base text-gray-500">
                                Please contact Sara and Gavriel for any change of plans
                            </p>
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
        <div className="shadow-2xl fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-20 pt-16 backdrop-blur-sm">
            <div className="bg-white p-6 w-full mx-2 max-w-md max-h-[calc(100vh-8rem)] overflow-y-auto flex flex-col rounded-xl mt-4 shadow-xl border border-gray-100">
                {renderModalContent()}
            </div>
        </div>
    );
};

export default Modal; 