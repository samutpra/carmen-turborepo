import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchBusinessUnitsWithClusterData } from '@/services/cluster/business-unit-with-cluster';
import { Building2, Eye, FolderTree, Globe, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const ClusterCard = async () => {
    const businessUnits = await fetchBusinessUnitsWithClusterData();

    const displayBusinessUnits = businessUnits.map((businessUnit) => (
        <Card key={businessUnit.id}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="flex items-center gap-2">
                            <FolderTree className="h-5 w-5 text-muted-foreground" />
                            {businessUnit.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{businessUnit?.clusterDetails?.region}</span>
                            <Badge variant="outline">{businessUnit.status}</Badge>
                        </div>
                    </div>
                    <Link href={`/admin/clusters/${businessUnit.id}/business-units`}>
                        <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Business Units</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Teams</span>
                            <span>{businessUnit.details.teams}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Total Rooms</span>
                            <span>{businessUnit.details.rooms}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">Members</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Total Members</span>
                            <span>{businessUnit.details.members}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Avg per Unit</span>
                            <span>{Math.round(businessUnit.details.members / businessUnits.length)}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    ))
    return displayBusinessUnits;
}

export default ClusterCard;