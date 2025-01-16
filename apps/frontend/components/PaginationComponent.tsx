import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    // PaginationNext,
    // PaginationPrevious,
} from "@/components/ui-custom/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PaginationComponent = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <Pagination className="flex justify-end mt-4 items-center">
            <PaginationContent>
                <PaginationItem>
                    <ChevronLeft
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage - 1);
                        }}
                        size={18}
                        className={currentPage <= 1 ? 'pointer-events-none opacity-50 mr-2' : 'cursor-pointer'}
                    />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink
                        href="#"
                        isActive={currentPage === 1}
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(1);
                        }}
                    >
                        1
                    </PaginationLink>
                </PaginationItem>

                {currentPage > 3 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {currentPage > 2 && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage - 1);
                            }}
                        >
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {currentPage !== 1 && currentPage !== totalPages && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            isActive={true}
                        >
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {currentPage < totalPages - 1 && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                        >
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {currentPage < totalPages - 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {totalPages > 1 && (
                    <PaginationItem>
                        <PaginationLink
                            href="#"
                            isActive={currentPage === totalPages}
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(totalPages);
                            }}
                        >
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem>
                    <ChevronRight
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(currentPage + 1);
                        }}
                        className={currentPage >= totalPages ? 'pointer-events-none opacity-50 mr-2' : 'cursor-pointer'}
                        size={18}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;