import React from "react";
import StoreLcationDetails from "../components/StoreLcationDetails";
interface Props {
    params: { id: string };
}

const StoreLocationIdPage = ({ params }: Props) => {
    return <StoreLcationDetails id={params.id} />;
};

export default StoreLocationIdPage;