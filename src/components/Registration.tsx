import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./forms/InputField";
import { api } from "~/utils/api";
type User = {
    name: string
    email: string
    password: string
}
export const Registration = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const createUser = api.user.create.useMutation({
        onSuccess: () => { }
    })

    const onSubmit = async (user: User) => {
        // console.log(user.email);
        // alert(JSON.stringify(user));
        createUser.mutate({
            name: user.name,
            email: user.email,
            password: user.password,
        });
    };

    return (
        <div className="mx-5 mt-5 grid grid-cols-4 gap-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <InputField
                        // disabled={!editable}
                        type={"text"}
                        label={"Name"}
                        name={"name"}
                        register={register}
                        placeholder={"Type Name here"}
                        required
                    />

                    <InputField
                        // disabled={!editable}
                        type={"email"}
                        label={"Email"}
                        name={"email"}
                        register={register}
                        placeholder={"--@email.com"}
                        required
                    />

                    <InputField
                        // disabled={!editable}
                        type={"password"}
                        label={"Password"}
                        name={"password"}
                        register={register}
                        placeholder={"Type password here"}
                        required
                    />
                </div >
                {/* <input
                    {...register("email", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                />

                <input
                    type="password"
                    {...register("password", {
                        required: true,
                        maxLength: 20,
                        pattern: /^[A-Za-z]+$/i
                    })}
                /> */}
                <input className="btn" type="submit" />
            </form>
        </div>
    )
};