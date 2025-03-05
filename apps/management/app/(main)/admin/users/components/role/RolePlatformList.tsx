import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building, Building2, Shield } from 'lucide-react'
import React from 'react'
import TabPlatform from './TabPlatform'
import TabCluster from './TabCluster'
import TabDepartment from './TabDepartment'

const RolePlatformList = () => {
    return (
        <Tabs defaultValue="platform" className="space-y-4">
            <TabsList>
                <TabsTrigger value="platform" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Platform Roles
                </TabsTrigger>
                <TabsTrigger value="cluster" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Cluster Roles
                </TabsTrigger>
                <TabsTrigger value="department" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Department Roles
                </TabsTrigger>
            </TabsList>

            <TabsContent value="platform">
                <TabPlatform />
            </TabsContent>

            <TabsContent value="cluster">
                <TabCluster />
            </TabsContent>

            <TabsContent value="department">
                <TabDepartment />
            </TabsContent>
        </Tabs>
    )
}

export default RolePlatformList