import ButtonLoading from "@/Components/ButtonLoading";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DetailKontak from "./DetailKontak";

const CardBooking = (props) => {
    console.log(props);

    let [isLoading, setLoading] = useState(false);

    let { data, setData, post } = useForm({
        id_user: props.booking.auth.user.id,
        id_wisata: props.booking.destinasi.uuid,
        jumlahTiket: 1,
        tanggal: "",
        totalHarga: props.booking.destinasi.harga,
    });

    console.log(props, "Halo");
    const destroyData = () => {
        setData("jumlahTiket", 1);
        setData("tanggal", "");
        setData("totalHarga", 0);
        setData("id_wisata", props.booking.destinasi.uuid);
    };

    const submitBooking = async () => {
        setLoading(true);
        console.log("submit");
        post(route("booking.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
            },
            onError: () => {
                console.log("error");
            },
        });
    };

    const convertRupiah = (angka) => {
        var rupiah = "";
        var angkarev = angka.toString().split("").reverse().join("");
        for (var i = 0; i < angkarev.length; i++)
            if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
        return (
            "Rp " +
            rupiah
                .split("", rupiah.length - 1)
                .reverse()
                .join("")
        );
    };

    const handleCounter = (e) => {
        if (e === "plus") {
            setData("jumlahTiket", ++data.jumlahTiket);
            setData(
                "totalHarga",
                data.jumlahTiket * props.booking.destinasi.harga
            );
        } else if (e === "minus") {
            if (data.jumlahTiket > 1) {
                setData("jumlahTiket", --data.jumlahTiket);
                setData(
                    "totalHarga",
                    data.jumlahTiket * props.booking.destinasi.harga
                );
            }
        }
    };

    return (
        /* section card */
        <div className="card w-[511px] bg-base-100 shadow-lg p-6">
            <div className="flex flex-col gap-6">
                {/* section tujuan */}
                <CardBooking.Structure text={"Destinasi"}>
                    <div className="flex justify-between">
                        <div className="flex flex-rows-2 gap-4">
                            <img
                                src="../../images/icons/destinasi.svg"
                                alt=""
                            />
                            <div className="flex flex-col">
                                <h3 className="text-[#232631] text-[18px]">
                                    {props.booking.destinasi.nama}
                                </h3>
                                <p className="font-light text-gray-400 text-[14px]">
                                    {props.booking.destinasi.kategori}
                                </p>
                            </div>
                        </div>
                        <input
                            type="date"
                            className="border-1 border-[#EAEAEA] p-2 rounded-lg"
                            onChange={(e) => setData("tanggal", e.target.value)}
                        />
                    </div>
                </CardBooking.Structure>

                {/* end section tujuan */}
                <div className="h-[1px] w-full bg-[#EAEAEA]"></div>
                {/* section detail pemesanan */}
                <CardBooking.Structure text={"Detail Pemesan"}>
                    <DetailKontak data={props.booking} />
                </CardBooking.Structure>
                {/* end section detail pemesanan */}

                {/* section hitung tiket */}
                <div className="border rounded-xl border-[#EAEAEA] grid grid-cols-[auto_40%] gap-4">
                    <div className="flex-1 justify-start">
                        <div className="flex items-center justify-between p-4 gap-5 ">
                            <button
                                onClick={() => handleCounter("minus")}
                                className="bg-gray-100 text-[20px] text-gray-700  h-[30px] w-[30px] rounded-full"
                                id="minusBtn"
                            >
                                -
                            </button>
                            <div className="flex gap-2">
                                <h1 className="text-center" id="counterInput">
                                    {data.jumlahTiket}
                                </h1>
                                <h1>Orang</h1>
                            </div>
                            <button
                                onClick={() => handleCounter("plus")}
                                className="bg-gray-100 text-[20px] text-gray-700  h-[30px] w-[30px] rounded-full"
                                id="plusBtn"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="bg-cardbooking rounded-xl">
                        <div className="w-[182px] grid place-items-center h-full ">
                            <h1
                                className="text-center text-[#3258E8] text-[20px] leading-[30px] font-semibold"
                                id="counterInput"
                            >
                                {convertRupiah(data.totalHarga)}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* end section hitung tiket */}

                {/* section bayar */}
                <div className="flex justify-between items-center">
                    <select className="select select-ghost  max-w-xs font-normal text-[16px] leading-[24px] text-[#6D6D6D]">
                        <option disabled selected>
                            <h1 className="flex-grow ">
                                Pilih Metode Pembayaran
                            </h1>
                        </option>
                        <option>VA BCA</option>
                        <option>QRIS</option>
                        <option>VA BRI</option>
                    </select>

                    {isLoading ? (
                        <ButtonLoading />
                    ) : (
                        <button
                            onClick={() => submitBooking()}
                            className="btn btn-primary w-[194px] rounded-xl button-cardbooking"
                            disabled={data.tanggal === "" ? true : false}
                        >
                            Bayar
                        </button>
                    )}
                </div>
                {/* end section bayar */}
            </div>
        </div>
        /* end section card */
    );
};

const Structure = ({ children, text, className }) => {
    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-[#232631] text-[20px] leading-[30px] font-semibold">
                {text}
            </h1>
            <div className={`${className}`}>{children}</div>
        </div>
    );
};

CardBooking.Structure = Structure;

export default CardBooking;
