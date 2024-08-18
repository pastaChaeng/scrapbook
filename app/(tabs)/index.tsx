import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Post {
  id: string;
  imageUri: string;
  caption: string;
  likes: number;
  comments: string[];
}

export default function ScrapbookScreen() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState('');
  const [albumImages, setAlbumImages] = useState<string[]>([]);

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const createPost = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const newPost: Post = {
        id: Math.random().toString(),
        imageUri: result.assets[0].uri,
        caption,
        likes: 0,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setCaption('');
    }
  };

  const addToAlbum = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAlbumImages([...albumImages, result.assets[0].uri]);
    }
  };

  const likePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    }));
  };

  const addComment = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    setNewComment('');
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={pickProfileImage} style={styles.profileImageContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImageContainer}>
              <Text style={styles.placeholderText}>Add Profile Picture</Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <TextInput
            style={styles.nameInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
        </View>
      </View>

      <View style={styles.createPostSection}>
        <Text style={styles.sectionTitle}>Create a New Post</Text>
        <TextInput
          style={styles.input}
          placeholder="What's on your mind?"
          value={caption}
          onChangeText={setCaption}
          multiline
        />
        <Button title="Post" color="#FF69B4" onPress={createPost} />
      </View>

      <View style={styles.albumSection}>
        <Text style={styles.sectionTitle}>Your Album</Text>
        <FlatList
          data={albumImages}
          horizontal
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.albumImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Button title="Add to Album" color="#FF69B4" onPress={addToAlbum} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.postImage} />
            <Text style={styles.postCaption}>{item.caption}</Text>
            <View style={styles.interactionContainer}>
              <TouchableOpacity onPress={() => likePost(item.id)} style={styles.likeButton}>
                <Text style={styles.likeText}>❤️ {item.likes}</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                onSubmitEditing={() => addComment(item.id)}
              />
              {item.comments.map((comment, index) => (
                <Text key={index} style={styles.commentText}>
                  {comment}
                </Text>
              ))}
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  placeholderImageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#FFB6C1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#FFF',
  },
  profileDetails: {
    flex: 1,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  createPostSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 8,
    color: '#FF69B4',
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  albumSection: {
    marginBottom: 24,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 8,
  },
  postContainer: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#FFB6C1',
    paddingBottom: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  postCaption: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  interactionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  likeButton: {
    marginBottom: 8,
  },
  likeText: {
    fontSize: 16,
    color: '#FF69B4',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#FFB6C1',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    width: '100%',
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
});
