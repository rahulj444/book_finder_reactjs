import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

const ViewToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex gap-1 border rounded-lg p-1">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('grid')}
        className="gap-2"
      >
        <Grid3X3 className="h-4 w-4" />
        Grid
      </Button>
      <Button
        variant={viewMode === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewModeChange('list')}
        className="gap-2"
      >
        <List className="h-4 w-4" />
        List
      </Button>
    </div>
  );
};

export default ViewToggle;

