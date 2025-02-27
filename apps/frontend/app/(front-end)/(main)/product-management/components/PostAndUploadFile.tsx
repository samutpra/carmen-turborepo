import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
// import { useAuth } from '@/app/context/AuthContext';
import { Paperclip, X, Send, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileWithPreview extends File {
    id: string;
    preview?: string;
}

const PostAndUploadFile = () => {
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    // const { accessToken, tenantId } = useAuth();

    const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;

        console.log('e.target.files', e.target.files);

        const newFiles = Array.from(e.target.files).map(file => ({
            ...file,
            id: Math.random().toString(36).substring(2, 11),
            preview: file.type.startsWith('image/')
                ? URL.createObjectURL(file)
                : undefined
        }));

        setFiles(prev => [...prev, ...newFiles]);

        // Reset the input value so the same file can be selected again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveFile = (id: string) => {
        setFiles(files.filter(file => file.id !== id));
    };

    const handleSubmit = async () => {
        if (!message.trim() && !files.length) return;

        setIsUploading(true);

        // Mock progress for demonstration
        const timer = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);

        try {
            // Here you would implement the actual submission logic
            // e.g. using FormData to send both message and files

            // Example:
            // const formData = new FormData();
            // formData.append('message', message);
            // files.forEach(file => formData.append('files', file));
            // await fetch('your-api-endpoint', {
            //   method: 'POST',
            //   headers: { Authorization: `Bearer ${accessToken}` },
            //   body: formData
            // });

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Clear form after successful submission
            setMessage('');
            setFiles([]);

        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            clearInterval(timer);
            setUploadProgress(0);
            setIsUploading(false);
        }
    };

    const getFileIcon = (fileName: string | undefined) => {
        if (!fileName) return <File className="h-4 w-4 text-gray-500" />;

        console.log('fileName:', fileName);

        const extension = fileName.split('.').pop()?.toLowerCase();

        console.log('extension:', extension);


        switch (extension) {
            case 'pdf':
                return <File className="h-4 w-4 text-red-500" />;
            case 'doc':
            case 'docx':
                return <File className="h-4 w-4 text-blue-500" />;
            case 'xls':
            case 'xlsx':
                return <File className="h-4 w-4 text-green-500" />;
            case 'ppt':
            case 'pptx':
                return <File className="h-4 w-4 text-orange-500" />;
            default:
                return <File className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="w-full space-y-2">
            {/* Message input */}
            <Textarea
                placeholder="Write a comment..."
                value={message}
                onChange={handleMessageChange}
                className="min-h-20 text-sm focus-visible:ring-1"
            />

            {/* File attachments preview */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map(file => (
                        <div
                            key={file.id}
                            className="flex items-center gap-2 p-2 rounded-md bg-gray-50 border border-gray-200"
                        >
                            {file.preview ? (
                                <div className="h-8 w-8 rounded overflow-hidden bg-gray-100">
                                    <img
                                        src={file.preview}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-8 w-8 rounded flex items-center justify-center bg-gray-100">
                                    {getFileIcon(file.name)}
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium truncate">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                    {(() => {
                                        // Log the file for debugging
                                        console.log('File object:', file);

                                        // Check if size exists and is a number
                                        if (file && typeof file.size === 'number') {
                                            const sizeInKB = file.size / 1024;

                                            // Format based on size
                                            if (sizeInKB < 1024) {
                                                return `${Math.round(sizeInKB)} KB`;
                                            } else {
                                                const sizeInMB = sizeInKB / 1024;
                                                return `${sizeInMB.toFixed(2)} MB`;
                                            }
                                        }

                                        // Fallback for when size isn't available
                                        return 'Size unknown';
                                    })()}
                                </p>
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => handleRemoveFile(file.id)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload progress */}
            {isUploading && (
                <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-1" />
                </div>
            )}

            {/* Action buttons */}
            <div className="flex justify-between items-center pt-1">
                <div className="flex items-center gap-1">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-8 gap-1"
                            >
                                <Paperclip className="h-4 w-4" />
                                Attach
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                                Upload files
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    if (fileInputRef.current) {
                                        fileInputRef.current.accept = "image/*";
                                        fileInputRef.current.click();
                                    }
                                }}
                            >
                                Upload images
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button
                    size="sm"
                    className={cn(
                        "text-xs h-8 gap-1",
                        (!message.trim() && !files.length) && "opacity-70"
                    )}
                    disabled={(!message.trim() && !files.length) || isUploading}
                    onClick={handleSubmit}
                >
                    <Send className="h-4 w-4" />
                    Send
                </Button>
            </div>
        </div>
    );
};

export default PostAndUploadFile;