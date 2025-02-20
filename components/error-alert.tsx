import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ErrorAlertProps {
    title: string;
    description: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ title = 'Error', description = 'Oops, something went wrong!' }) => {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
};

export default ErrorAlert;
