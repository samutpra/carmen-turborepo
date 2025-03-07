'use server';

import { ClusterMemberFormValues } from "@/types/form/form";

export const createClusterMember = async (data: ClusterMemberFormValues) => {
    console.log(data);
    return { success: true };
};

