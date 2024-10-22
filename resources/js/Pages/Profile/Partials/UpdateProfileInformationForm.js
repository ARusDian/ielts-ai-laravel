import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });
    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };
    return React.createElement(
        "section",
        { className: className },
        React.createElement(
            "header",
            null,
            React.createElement(
                "h2",
                { className: "text-lg font-medium text-gray-900" },
                "Profile Information",
            ),
            React.createElement(
                "p",
                { className: "mt-1 text-sm text-gray-600" },
                "Update your account's profile information and email address.",
            ),
        ),
        React.createElement(
            "form",
            { onSubmit: submit, className: "mt-6 space-y-6" },
            React.createElement(
                "div",
                null,
                React.createElement(InputLabel, {
                    htmlFor: "name",
                    value: "Name",
                }),
                React.createElement(TextInput, {
                    id: "name",
                    className: "mt-1 block w-full",
                    value: data.name,
                    onChange: (e) => setData("name", e.target.value),
                    required: true,
                    isFocused: true,
                    autoComplete: "name",
                }),
                React.createElement(InputError, {
                    className: "mt-2",
                    message: errors.name,
                }),
            ),
            React.createElement(
                "div",
                null,
                React.createElement(InputLabel, {
                    htmlFor: "email",
                    value: "Email",
                }),
                React.createElement(TextInput, {
                    id: "email",
                    type: "email",
                    className: "mt-1 block w-full",
                    value: data.email,
                    onChange: (e) => setData("email", e.target.value),
                    required: true,
                    autoComplete: "username",
                }),
                React.createElement(InputError, {
                    className: "mt-2",
                    message: errors.email,
                }),
            ),
            mustVerifyEmail &&
                user.email_verified_at === null &&
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        { className: "mt-2 text-sm text-gray-800" },
                        "Your email address is unverified.",
                        React.createElement(
                            Link,
                            {
                                href: route("verification.send"),
                                method: "post",
                                as: "button",
                                className:
                                    "rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
                            },
                            "Click here to re-send the verification email.",
                        ),
                    ),
                    status === "verification-link-sent" &&
                        React.createElement(
                            "div",
                            {
                                className:
                                    "mt-2 text-sm font-medium text-green-600",
                            },
                            "A new verification link has been sent to your email address.",
                        ),
                ),
            React.createElement(
                "div",
                { className: "flex items-center gap-4" },
                React.createElement(
                    PrimaryButton,
                    { disabled: processing },
                    "Save",
                ),
                React.createElement(
                    Transition,
                    {
                        show: recentlySuccessful,
                        enter: "transition ease-in-out",
                        enterFrom: "opacity-0",
                        leave: "transition ease-in-out",
                        leaveTo: "opacity-0",
                    },
                    React.createElement(
                        "p",
                        { className: "text-sm text-gray-600" },
                        "Saved.",
                    ),
                ),
            ),
        ),
    );
}
