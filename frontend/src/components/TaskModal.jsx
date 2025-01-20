import { useState } from "react";

export default function TaskModal({ routines, day }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalDescription, setModalDescription] = useState([]); // Use state for modalDescription

    const openModal = (description) => {
        setModalDescription(description); // Update state
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalDescription([]); // Clear description when modal closes
    };

    return (
        <>
            <div className="calendarTasks">
                <ul>
                    {routines.flatMap((element) =>
                        element.tasks
                            .filter((task) => task.days.toLowerCase() === day.toLowerCase())
                            .map((task) => (
                                <li
                                    key={task._id}
                                    className="singleCalendarTask"
                                    onClick={() => openModal([task.description, task.title])}
                                >
                                    <h3>{task.title}</h3>
                                </li>
                            ))
                    )}
                </ul>
            </div>

            {isModalOpen && (
                <div className="modalOverlay" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e .stopPropagation()}>
                        <div className="modalContent" >
                            <h2>{modalDescription[1]}</h2>
                            <p>{modalDescription[0]}</p> {/* modalDescription is now reactive */}
                            <button onClick={closeModal}>Close Modal</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}