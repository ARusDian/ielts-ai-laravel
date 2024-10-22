import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";
export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef(null);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });
    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };
    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };
    return React.createElement(
        "section",
        { className: `space-y-6 ${className}` },
        React.createElement(
            "header",
            null,
            React.createElement(
                "h2",
                { className: "text-lg font-medium text-gray-900" },
                "Delete Account",
            ),
            React.createElement(
                "p",
                { className: "mt-1 text-sm text-gray-600" },
                "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.",
            ),
        ),
        React.createElement(
            DangerButton,
            { onClick: confirmUserDeletion },
            "Delete Account",
        ),
        React.createElement(
            Modal,
            { show: confirmingUserDeletion, onClose: closeModal },
            React.createElement(
                "form",
                { onSubmit: deleteUser, className: "p-6" },
                React.createElement(
                    "h2",
                    { className: "text-lg font-medium text-gray-900" },
                    "Are you sure you want to delete your account?",
                ),
                React.createElement(
                    "p",
                    { className: "mt-1 text-sm text-gray-600" },
                    "Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.",
                ),
                React.createElement(
                    "div",
                    { className: "mt-6" },
                    React.createElement(InputLabel, {
                        htmlFor: "password",
                        value: "Password",
                        className: "sr-only",
                    }),
                    React.createElement(TextInput, {
                        id: "password",
                        type: "password",
                        name: "password",
                        ref: passwordInput,
                        value: data.password,
                        onChange: (e) => setData("password", e.target.value),
                        className: "mt-1 block w-3/4",
                        isFocused: true,
                        placeholder: "Password",
                    }),
                    React.createElement(InputError, {
                        message: errors.password,
                        className: "mt-2",
                    }),
                ),
                React.createElement(
                    "div",
                    { className: "mt-6 flex justify-end" },
                    React.createElement(
                        SecondaryButton,
                        { onClick: closeModal },
                        "Cancel",
                    ),
                    React.createElement(
                        DangerButton,
                        { className: "ms-3", disabled: processing },
                        "Delete Account",
                    ),
                ),
            ),
        ),
    );
}
