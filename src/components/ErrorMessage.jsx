import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Search } from 'lucide-react';

const ErrorMessage = ({ 
  type = 'error', 
  title, 
  message, 
  onRetry,
  showRetryButton = true 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'no-results':
        return <Search className="h-16 w-16 text-muted-foreground mb-4" />;
      case 'error':
      default:
        return <AlertTriangle className="h-16 w-16 text-destructive mb-4" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'no-results':
        return 'No books found';
      case 'error':
      default:
        return 'Oops! Something went wrong';
    }
  };

  const getDefaultMessage = () => {
    switch (type) {
      case 'no-results':
        return 'Try searching with different keywords or check your spelling.';
      case 'error':
      default:
        return 'Failed to search books. Please check your internet connection and try again.';
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-8 text-center">
        {getIcon()}
        <h3 className="text-xl font-semibold mb-2">
          {title || getDefaultTitle()}
        </h3>
        <p className="text-muted-foreground mb-6">
          {message || getDefaultMessage()}
        </p>
        {showRetryButton && onRetry && (
          <Button onClick={onRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorMessage;

