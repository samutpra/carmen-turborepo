'use client';

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Save } from 'lucide-react'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useSettings } from '@/hooks/setting';
import GeneralCard from './GeneralCard';
import { settingsFormSchema, SettingsFormValues } from '@/types/form';
import LocalizationCard from './LocalizationCard';
import MaintenanceCard from './MaintenanceCard';

const defaultValues: SettingsFormValues = {
    general: {
        name: '',
        email: '',
        phone: '',
        address: {
            house_number: '',
            road: '',
            sub_district: '',
            district: '',
            province: '',
            postal_code: '',
        }
    },
    localization: {
        language: '',
        timezone: '',
    },
    maintenance: {
        enabled: false,
        message: '',
    }
};

const GeneralSetting = () => {
    const { settings } = useSettings();
    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(settingsFormSchema),
        defaultValues
    });

    useEffect(() => {
        if (settings) {
            form.reset(settings);
        }
    }, [settings, form]);

    const onSubmit = async (data: SettingsFormValues) => {

        console.log(data);
        // TODO: Implement save functionality
    };


    return (
        <div className='space-y-6'>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Manage your platform settings and preferences
                    </p>
                </div>
                <Button
                    type="submit"
                    form="settings-form"
                    className="font-medium"
                    size={'sm'}
                >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                </Button>
            </div>
            <Form {...form}>
                <form id="settings-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <GeneralCard control={form.control} />
                    <LocalizationCard control={form.control} />
                    <MaintenanceCard control={form.control} />
                </form>
            </Form>
        </div>
    );
};

export default GeneralSetting;