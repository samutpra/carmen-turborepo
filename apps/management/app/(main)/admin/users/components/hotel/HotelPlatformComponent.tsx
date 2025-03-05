import { fetchUserPlatform } from '@/services/user/platform';
import { User } from 'lucide-react'
import React from 'react'
import HotelPlatformList from './HotelPlatformList';
import FilterHotelPlatform from './FilterHotelPlatform';


const HotelPlatformComponent = async () => {
    const users = await fetchUserPlatform();
    return (
        <div className='space-y-6'>
            <div className='space-y-1 flex items-end justify-between'>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Hotel Staff
                    </h2>
                    <p className="text-muted-foreground">
                        Manage hotel staff and department access
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <User className='w-6 h-6' />
                    <span className='text-lg font-medium text-muted-foreground'>{users.length} users</span>
                </div>
            </div>
            <FilterHotelPlatform />
            <HotelPlatformList users={users} />
        </div>
    )
}

export default HotelPlatformComponent