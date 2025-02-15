import ButtonLoginRegister from "@/Components/ButtonLoginRegister";
import Label from "@/Components/Label";
import Input from "./../Components/Input";
import { Head, Link, useForm } from "@inertiajs/react";
import Navbar from "@/Partials/Navbar";
import { useEffect, useState } from "react";
import ButtonLoading from "@/Components/ButtonLoading";

const Login = (props) => {
    const { data, setData, post } = useForm({
        email: "",
        password: "",
    });

    const [IsMobile, setIsMobile] = useState(false);
    let [isLoading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        post(route("login"), {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
            },
        });
    };

    useEffect(() => {
        if (window.innerWidth <= 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    return (
        <form onSubmit={submit}>
            <Head title="Login" />
            {
                IsMobile && <Navbar />
            }


            <div className="grid lg:grid-cols-2">
                <div className="grid place-items-center h-screen">
                    <div className="card bg-base-100 max-w-lg w-full">
                        <div className="card-body p-[50px] flex flex-col gap-[20px]">
                            <h1 className="text-[32px] font-semibold">Login</h1>
                            {props.errors.status && (
                                <div className="alert alert-error">
                                    {props.errors.status}
                                </div>
                            )}
                            <div className="email flex flex-col gap-[12px]">
                                <Label text={"Alamat Email"} />
                                <Input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <div className="password">
                                    <div className="flex flex-col gap-[12px]">
                                        <Label text={"Password"} />
                                        <Input
                                            name="password"
                                            type="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    {" "}
                                    <a href="">
                                        <p className="text-[#868B90] underline underline-offset-1 text-[12px] md:text-[16px] mt-3">
                                            Forgot my password
                                        </p>
                                    </a>
                                </div>
                            </div>
                            {
                                isLoading ? (
                                    <ButtonLoading/>
                                ) : (
                                    <ButtonLoginRegister
                                        text={"Login"}
                                        disabled={
                                            data.email &&
                                            data.password
                                                ? false
                                                : true
                                        }
                                    />
                                )
                            }
                            <Link href="/register" className="text-center text-[#868B90]">
                                <p className="underline underline-offset-1 text-[12px] md:text-[16px]">
                                    Create New Account
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div
                    className="h-full w-full bg-blue-600 hidden lg:flex shrink"
                    id="login-onboarding"
                >
                </div>
            </div>
        </form>
    );
};

export default Login;
