import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  LinearProgress,
  Grid,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { apiRequest } from '../config/api';

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
  onImageRemove?: (imageUrl: string) => void;
  multiple?: boolean;
  maxImages?: number;
  acceptedFormats?: string[];
  maxSize?: number; // in MB
  currentImages?: string[];
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  multiple = false,
  maxImages = 5,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 5,
  currentImages = [],
  disabled = false,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Check if we're within the limit
    if (currentImages.length + files.length > maxImages) {
      setSnackbar({
        open: true,
        message: `You can only upload up to ${maxImages} images.`,
        severity: 'error'
      });
      return;
    }

    // Validate file types and sizes
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      if (!acceptedFormats.includes(file.type)) {
        setSnackbar({
          open: true,
          message: `Please upload only ${acceptedFormats.join(', ')} files.`,
          severity: 'error'
        });
        return;
      }

      if (file.size > maxSize * 1024 * 1024) {
        setSnackbar({
          open: true,
          message: `File size must be less than ${maxSize}MB.`,
          severity: 'error'
        });
        return;
      }
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      
      if (multiple) {
        Array.from(files).forEach((file) => {
          formData.append('images', file);
        });
      } else {
        formData.append('image', files[0]);
      }

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await apiRequest(
        multiple ? '/api/upload/images' : '/api/upload/image',
        {
          method: 'POST',
          body: formData,
          headers: {
            // Don't set Content-Type, let the browser set it with boundary
          },
        }
      );

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (response.success) {
        if (multiple && response.files) {
          response.files.forEach((file: any) => {
            onImageUpload(file.secure_url);
          });
        } else if (response.file) {
          onImageUpload(response.file.secure_url);
        }

        setSnackbar({
          open: true,
          message: `${multiple ? 'Images' : 'Image'} uploaded successfully!`,
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to upload image. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (imageUrl: string) => {
    if (onImageRemove) {
      onImageRemove(imageUrl);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current && !disabled) {
      fileInputRef.current.click();
    }
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {/* File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        multiple={multiple}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        disabled={disabled}
      />

      {/* Upload Button */}
      {currentImages.length < maxImages && (
        <Paper
          sx={{
            border: '2px dashed',
            borderColor: disabled ? 'grey.300' : 'primary.main',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            '&:hover': !disabled ? {
              borderColor: 'primary.dark',
              bgcolor: 'primary.50',
            } : {},
            transition: 'all 0.2s'
          }}
          onClick={openFileDialog}
        >
          <Stack spacing={2}>
            <FaCloudUploadAlt size={32} color={disabled ? '#9e9e9e' : '#1976d2'} />
            <Typography variant="h6" color="text.primary">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {multiple
                ? `Upload up to ${maxImages - currentImages.length} images`
                : 'Upload a single image'}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {acceptedFormats.join(', ')} • Max {maxSize}MB each
            </Typography>
          </Stack>
        </Paper>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Uploading... {uploadProgress}%
          </Typography>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Box>
      )}

      {/* Current Images */}
      {currentImages.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="body2" fontWeight="medium" color="text.primary">
            Uploaded Images ({currentImages.length}/{maxImages})
          </Typography>
          <Grid container spacing={1}>
            {currentImages.map((imageUrl, index) => (
              <Grid item key={index}>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={imageUrl}
                    alt={`Uploaded image ${index + 1}`}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}
                  />
                  {onImageRemove && (
                    <IconButton
                      aria-label="Remove image"
                      size="small"
                      color="error"
                      sx={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        bgcolor: 'error.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'error.dark',
                        }
                      }}
                      onClick={() => handleRemoveImage(imageUrl)}
                      disabled={disabled}
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ImageUpload; 