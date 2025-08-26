import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Building, ExternalLink, ImageIcon } from 'lucide-react';

const BookCard = ({ book, viewMode = 'grid' }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const coverUrl = book.cover_i && !imageError
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  const title = book.title || 'Unknown Title';
  const authors = book.author_name ? book.author_name.slice(0, 3).join(', ') : 'Unknown Author';
  const year = book.first_publish_year;
  const publisher = book.publisher ? book.publisher[0] : null;

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleViewDetails = () => {
    if (book.key) {
      window.open(`https://openlibrary.org${book.key}`, '_blank');
    }
  };

  const renderCover = () => (
    <div className={`relative overflow-hidden rounded-lg ${
      viewMode === 'grid' ? 'aspect-[3/4] w-full' : 'w-24 h-32 flex-shrink-0'
    }`}>
      {coverUrl ? (
        <>
          {imageLoading && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        </>
      ) : (
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center p-4">
            <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-xs text-muted-foreground">No Cover</p>
          </div>
        </div>
      )}
      
      {/* Hover overlay for grid view */}
      {viewMode === 'grid' && (
        <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleViewDetails}
            variant="secondary"
            size="sm"
            className="bg-white/90 text-black hover:bg-white"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      )}
    </div>
  );

  const renderInfo = () => (
    <div className={`${viewMode === 'grid' ? 'p-4' : 'flex-1 min-w-0'}`}>
      <h3 className={`font-semibold leading-tight mb-2 ${
        viewMode === 'grid' ? 'text-lg line-clamp-2' : 'text-base line-clamp-1'
      }`} title={title}>
        {title}
      </h3>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4 flex-shrink-0" />
          <span className="truncate" title={authors}>{authors}</span>
        </div>
        
        {year && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{year}</span>
          </div>
        )}
        
        {publisher && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4 flex-shrink-0" />
            <span className="truncate" title={publisher}>{publisher}</span>
          </div>
        )}
      </div>

      {viewMode === 'list' && (
        <Button
          onClick={handleViewDetails}
          variant="outline"
          size="sm"
          className="mt-3"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Details
        </Button>
      )}
    </div>
  );

  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {renderCover()}
            {renderInfo()}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        {renderCover()}
        {renderInfo()}
      </CardContent>
    </Card>
  );
};

export default BookCard;

