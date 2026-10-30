import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// ------------------------------------
// 1. SAMPLE RECIPE DATA
// ------------------------------------

const initialRecipes = [
  {
    id: '1',
    name: 'Margherita Pizza',
    category: 'Italian',
    image:
      'https://images.unsplash.com/photo-1579751626657-72bc17010498?w=700',
    time: 25,
    servings: 2,
    calories: 280,
    difficulty: 'Easy',
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil'],
    instructions: [
      'Preheat the oven.',
      'Spread tomato sauce over the dough.',
      'Add mozzarella and basil.',
      'Bake until the crust is golden.',
    ],
  },
  {
    id: '2',
    name: 'Chicken Biryani',
    category: 'Indian',
    image:
      'https://images.unsplash.com/photo-1563379091339-03246963d51a?w=700',
    time: 50,
    servings: 4,
    calories: 450,
    difficulty: 'Medium',
    ingredients: ['Chicken', 'Basmati rice', 'Onions', 'Spices', 'Yogurt'],
    instructions: [
      'Marinate the chicken with yogurt and spices.',
      'Cook the onions until golden.',
      'Add chicken and cook thoroughly.',
      'Layer with partially cooked rice.',
      'Cover and cook until the rice is tender.',
    ],
  },
  {
    id: '3',
    name: 'Chocolate Cake',
    category: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=700',
    time: 45,
    servings: 8,
    calories: 350,
    difficulty: 'Medium',
    ingredients: ['Flour', 'Cocoa powder', 'Sugar', 'Eggs', 'Butter'],
    instructions: [
      'Mix the dry ingredients.',
      'Add eggs and melted butter.',
      'Pour the batter into a cake pan.',
      'Bake until cooked through.',
    ],
  },
  {
    id: '4',
    name: 'Fresh Garden Salad',
    category: 'Healthy',
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700',
    time: 10,
    servings: 2,
    calories: 150,
    difficulty: 'Easy',
    ingredients: ['Lettuce', 'Tomatoes', 'Cucumber', 'Olive oil', 'Lemon'],
    instructions: [
      'Wash all the vegetables.',
      'Chop them into bite-sized pieces.',
      'Mix with olive oil and lemon juice.',
      'Serve fresh.',
    ],
  },
  {
    id: '5',
    name: 'Vegetable Fried Rice',
    category: 'Asian',
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=700',
    time: 20,
    servings: 2,
    calories: 320,
    difficulty: 'Easy',
    ingredients: ['Cooked rice', 'Carrots', 'Peas', 'Soy sauce', 'Garlic'],
    instructions: [
      'Heat oil in a pan.',
      'Saute the garlic and vegetables.',
      'Add cooked rice and soy sauce.',
      'Stir-fry and serve hot.',
    ],
  },
  {
    id: '6',
    name: 'Classic Pancakes',
    category: 'Breakfast',
    image:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=700',
    time: 15,
    servings: 3,
    calories: 220,
    difficulty: 'Easy',
    ingredients: ['Flour', 'Milk', 'Egg', 'Sugar', 'Baking powder'],
    instructions: [
      'Mix the ingredients into a smooth batter.',
      'Heat a lightly greased pan.',
      'Pour in a small amount of batter.',
      'Flip when bubbles appear and cook the other side.',
    ],
  },
  {
    id: '7',
    name: 'Creamy Mushroom Pasta',
    category: 'Italian',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700',
    time: 25,
    servings: 2,
    calories: 390,
    difficulty: 'Medium',
    ingredients: ['Pasta', 'Mushrooms', 'Cream', 'Garlic', 'Parmesan'],
    instructions: [
      'Boil the pasta until tender.',
      'Saute mushrooms and garlic.',
      'Add cream and simmer.',
      'Mix with pasta and serve.',
    ],
  },
  {
    id: '8',
    name: 'Tomato Soup',
    category: 'Soups',
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=700',
    time: 25,
    servings: 3,
    calories: 180,
    difficulty: 'Easy',
    ingredients: ['Tomatoes', 'Onion', 'Garlic', 'Vegetable stock'],
    instructions: [
      'Chop the tomatoes and onions.',
      'Cook them with garlic.',
      'Add vegetable stock and simmer.',
      'Blend until smooth and serve.',
    ],
  },
  {
    id: '9',
    name: 'Grilled Chicken',
    category: 'Non-Veg',
    image:
      'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=700',
    time: 35,
    servings: 2,
    calories: 310,
    difficulty: 'Medium',
    ingredients: ['Chicken breast', 'Olive oil', 'Lemon', 'Garlic', 'Pepper'],
    instructions: [
      'Season the chicken with the ingredients.',
      'Preheat the grill.',
      'Cook until the chicken reaches a safe internal temperature.',
      'Rest briefly before serving.',
    ],
  },
  {
    id: '10',
    name: 'Berry Smoothie',
    category: 'Drinks',
    image:
      'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=700',
    time: 5,
    servings: 1,
    calories: 190,
    difficulty: 'Easy',
    ingredients: ['Mixed berries', 'Milk', 'Banana', 'Yogurt'],
    instructions: [
      'Add all ingredients to a blender.',
      'Blend until smooth.',
      'Pour into a glass and enjoy.',
    ],
  },
  {
    id: '11',
    name: 'Paneer Tikka',
    category: 'Indian',
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=700',
    time: 30,
    servings: 3,
    calories: 290,
    difficulty: 'Medium',
    ingredients: ['Paneer', 'Yogurt', 'Bell peppers', 'Spices'],
    instructions: [
      'Mix yogurt with the spices.',
      'Coat paneer and vegetables in the marinade.',
      'Thread onto skewers.',
      'Grill until lightly charred.',
    ],
  },
  {
    id: '12',
    name: 'Avocado Toast',
    category: 'Vegan',
    image:
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700',
    time: 8,
    servings: 1,
    calories: 240,
    difficulty: 'Easy',
    ingredients: ['Bread', 'Avocado', 'Lemon juice', 'Salt', 'Pepper'],
    instructions: [
      'Toast the bread.',
      'Mash the avocado with lemon juice.',
      'Spread over the toast.',
      'Season and serve.',
    ],
  },
];

// At least 10 categories are displayed horizontally.
const categories = [
  'All',
  'Indian',
  'Italian',
  'Asian',
  'Breakfast',
  'Desserts',
  'Healthy',
  'Vegan',
  'Non-Veg',
  'Drinks',
  'Soups',
  'My Food',
];

// ------------------------------------
// 2. MAIN APP
// ------------------------------------

export default function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [screen, setScreen] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: '',
    category: 'Indian',
    image: '',
    time: '20',
    servings: '2',
    calories: '250',
    difficulty: 'Easy',
    ingredients: '',
    instructions: '',
  });

  // ------------------------------------
  // 3. NAVIGATION
  // ------------------------------------

  function goBack() {
    if (screen === 'detail') {
      if (selectedCategory === 'Favorites') {
        setScreen('favorites');
      } else if (selectedCategory === 'My Food') {
        setScreen('myrecipes');
      } else {
        setScreen('home');
      }
    } else if (screen === 'form') {
      setScreen(editingId ? 'myrecipes' : 'home');
    } else {
      setScreen('home');
    }
  }

  function openRecipe(recipe) {
    setSelectedRecipe(recipe);
    setScreen('detail');
  }

  function openMyFood() {
    setSelectedCategory('My Food');
    setScreen('myrecipes');
  }

  function openFavorites() {
    setSelectedCategory('Favorites');
    setScreen('favorites');
  }

  function selectCategory(category) {
    setSelectedCategory(category);

    if (category === 'My Food') {
      setScreen('myrecipes');
    } else if (category === 'Favorites') {
      setScreen('favorites');
    } else {
      setScreen('home');
    }
  }

  // ------------------------------------
  // 4. FAVORITES
  // ------------------------------------

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  // ------------------------------------
  // 5. ADD / EDIT RECIPE FORM
  // ------------------------------------

  function openAddForm() {
    setEditingId(null);

    setForm({
      name: '',
      category: 'Indian',
      image: '',
      time: '20',
      servings: '2',
      calories: '250',
      difficulty: 'Easy',
      ingredients: '',
      instructions: '',
    });

    setScreen('form');
  }

  function openEditForm(recipe) {
    setEditingId(recipe.id);

    setForm({
      name: recipe.name,
      category: recipe.category,
      image: recipe.image,
      time: String(recipe.time),
      servings: String(recipe.servings),
      calories: String(recipe.calories),
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients.join('\n'),
      instructions: recipe.instructions.join('\n'),
    });

    setScreen('form');
  }

  function updateForm(field, value) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function pickImage() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          'Permission needed',
          'Please allow access to your photo library.'
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        updateForm('image', result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Image picker', 'Unable to open your photo library.');
    }
  }

  function saveRecipe() {
    if (!form.name.trim()) {
      Alert.alert('Missing information', 'Please enter a recipe name.');
      return;
    }

    if (!form.ingredients.trim() || !form.instructions.trim()) {
      Alert.alert(
        'Missing information',
        'Please enter ingredients and instructions.'
      );
      return;
    }

    const ingredientList = form.ingredients
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const instructionList = form.instructions
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    const recipeData = {
      id: editingId || Date.now().toString(),
      name: form.name.trim(),
      category: form.category,
      image: form.image.trim(),
      time: Math.max(1, Number(form.time) || 20),
      servings: Math.max(1, Number(form.servings) || 2),
      calories: Math.max(0, Number(form.calories) || 0),
      difficulty: form.difficulty,
      ingredients: ingredientList,
      instructions: instructionList,
      isMine: true,
    };

    if (editingId) {
      setRecipes((previous) =>
        previous.map((recipe) =>
          recipe.id === editingId
            ? { ...recipeData, isMine: true }
            : recipe
        )
      );
    } else {
      setRecipes((previous) => [...previous, recipeData]);
    }

    setSelectedCategory('My Food');
    setScreen('myrecipes');
    setEditingId(null);

    Alert.alert(
      'Success!',
      editingId
        ? 'Your recipe has been updated.'
        : 'Your new recipe has been added!'
    );
  }

  // ------------------------------------
  // 6. DELETE RECIPE
  // ------------------------------------

  function deleteRecipe(id) {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setRecipes((previous) =>
              previous.filter((recipe) => recipe.id !== id)
            );

            setFavorites((previous) =>
              previous.filter((item) => item !== id)
            );

            if (selectedRecipe?.id === id) {
              setSelectedRecipe(null);
            }
          },
        },
      ]
    );
  }

  // ------------------------------------
  // 7. FILTER RECIPES
  // ------------------------------------

  const myRecipes = recipes.filter((recipe) => recipe.isMine);

  const visibleRecipes =
    screen === 'favorites'
      ? recipes.filter((recipe) => favorites.includes(recipe.id))
      : screen === 'myrecipes'
      ? myRecipes
      : selectedCategory === 'All'
      ? recipes
      : recipes.filter(
          (recipe) => recipe.category === selectedCategory
        );

  // ------------------------------------
  // 8. RECIPE CARD
  // ------------------------------------

  function RecipeCard({ recipe }) {
    const isFavorite = favorites.includes(recipe.id);

    return (
      <TouchableOpacity
        style={styles.recipeCard}
        onPress={() => openRecipe(recipe)}
        activeOpacity={0.85}
      >
        {recipe.image ? (
          <Image
            source={{ uri: recipe.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.cardImage, styles.imagePlaceholder]}>
            <Text style={styles.placeholderEmoji}>🍲</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(recipe.id)}
        >
          <Text style={styles.heartText}>
            {isFavorite ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>

        <View style={styles.cardContent}>
          <Text style={styles.cardCategory}>{recipe.category}</Text>

          <Text style={styles.cardTitle} numberOfLines={1}>
            {recipe.name}
          </Text>

          <Text style={styles.cardMeta}>
            ⏱ {recipe.time} min · {recipe.difficulty}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // ------------------------------------
  // 9. HEADER
  // ------------------------------------

  function Header({ title }) {
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backText}>
            {screen === 'home' ? '🍴' : '‹'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>

        <TouchableOpacity
          onPress={openFavorites}
          style={styles.headerFavorite}
        >
          <Text style={{ fontSize: 22 }}>❤️</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ------------------------------------
  // 10. MAIN INTERFACE
  // ------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9F2" />

      <Header
        title={
          screen === 'detail'
            ? 'Recipe Details'
            : screen === 'form'
            ? editingId
              ? 'Edit Recipe'
              : 'Add Recipe'
            : screen === 'myrecipes'
            ? 'My Food'
            : screen === 'favorites'
            ? 'Favorites'
            : 'Foodie'
        }
      />

      {/* HOME FEED */}

      {screen === 'home' && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.welcome}>
            <Text style={styles.welcomeSmall}>HELLO, FOOD LOVER 👋</Text>

            <Text style={styles.welcomeTitle}>
              What would you{'\n'}like to cook today?
            </Text>

            <Text style={styles.welcomeSubtitle}>
              Discover delicious recipes made with love.
            </Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => selectCategory(category)}
                style={[
                  styles.categoryChip,
                  selectedCategory === category &&
                    styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category &&
                      styles.categoryTextActive,
                  ]}
                >
                  {category === 'My Food' ? '👨‍🍳 My Food' : category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory === 'All'
                ? 'Popular Recipes'
                : selectedCategory + ' Recipes'}
            </Text>

            <Text style={styles.countText}>
              {visibleRecipes.length} recipes
            </Text>
          </View>

          {visibleRecipes.length === 0 ? (
            <Text style={styles.emptyText}>No recipes found.</Text>
          ) : (
            <View style={styles.recipeGrid}>
              {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={openAddForm}
          >
            <Text style={styles.addButtonText}>＋ Add New Recipe</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />
        </ScrollView>
      )}

      {/* RECIPE DETAILS */}

      {screen === 'detail' && selectedRecipe && (
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedRecipe.image ? (
            <Image
              source={{ uri: selectedRecipe.image }}
              style={styles.detailImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.detailImage, styles.imagePlaceholder]}>
              <Text style={{ fontSize: 70 }}>🍲</Text>
            </View>
          )}

          <View style={styles.detailContent}>
            <Text style={styles.cardCategory}>
              {selectedRecipe.category.toUpperCase()}
            </Text>

            <Text style={styles.detailTitle}>
              {selectedRecipe.name}
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>⏱️</Text>
                <Text style={styles.statValue}>
                  {selectedRecipe.time} min
                </Text>
                <Text style={styles.statLabel}>Prep time</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>🍽️</Text>
                <Text style={styles.statValue}>
                  {selectedRecipe.servings}
                </Text>
                <Text style={styles.statLabel}>Servings</Text>
              </View>

              <View style={styles.statBox}>
                <Text style={styles.statEmoji}>🔥</Text>
                <Text style={styles.statValue}>
                  {selectedRecipe.calories}
                </Text>
                <Text style={styles.statLabel}>Calories</Text>
              </View>
            </View>

            <View style={styles.difficultyBox}>
              <Text style={styles.difficultyText}>
                👨‍🍳 Difficulty: {selectedRecipe.difficulty}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.favoriteDetailButton}
              onPress={() => toggleFavorite(selectedRecipe.id)}
            >
              <Text style={styles.favoriteDetailText}>
                {favorites.includes(selectedRecipe.id)
                  ? '❤️ Remove from Favorites'
                  : '🤍 Add to Favorites'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.detailSectionTitle}>🛒 Ingredients</Text>

            {selectedRecipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.listRow}>
                <Text style={styles.bullet}>●</Text>
                <Text style={styles.listText}>{ingredient}</Text>
              </View>
            ))}

            <Text style={styles.detailSectionTitle}>
              👩‍🍳 Step-by-Step Instructions
            </Text>

            {selectedRecipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionRow}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>

                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}

            {selectedRecipe.isMine && (
              <View style={styles.managementRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditForm(selectedRecipe)}
                >
                  <Text style={styles.editButtonText}>✏️ Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteRecipe(selectedRecipe.id)}
                >
                  <Text style={styles.deleteButtonText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={styles.addButton}
              onPress={goBack}
            >
              <Text style={styles.addButtonText}>← Back to Recipes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/* FAVORITES AND MY RECIPES */}

      {(screen === 'favorites' || screen === 'myrecipes') && (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.listScreenIntro}>
            <Text style={styles.listScreenTitle}>
              {screen === 'favorites'
                ? 'Your Favorite Recipes ❤️'
                : 'Your Kitchen, Your Recipes 👨‍🍳'}
            </Text>

            <Text style={styles.welcomeSubtitle}>
              {screen === 'favorites'
                ? 'All your saved recipes in one place.'
                : 'Create and manage your own recipes.'}
            </Text>
          </View>

          {screen === 'myrecipes' && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={openAddForm}
            >
              <Text style={styles.addButtonText}>
                ＋ Add New Recipe
              </Text>
            </TouchableOpacity>
          )}

          {visibleRecipes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyEmoji}>
                {screen === 'favorites' ? '💗' : '🍳'}
              </Text>

              <Text style={styles.emptyTitle}>
                {screen === 'favorites'
                  ? 'No favorites yet!'
                  : 'Your kitchen is waiting!'}
              </Text>

              <Text style={styles.emptyText}>
                {screen === 'favorites'
                  ? 'Tap the heart on a recipe to save it here.'
                  : 'Add your first recipe using the button above.'}
              </Text>

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  if (screen === 'favorites') {
                    selectCategory('All');
                  } else {
                    openAddForm();
                  }
                }}
              >
                <Text style={styles.addButtonText}>
                  {screen === 'favorites'
                    ? 'Explore Recipes'
                    : 'Add Your First Recipe'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.recipeGrid}>
              {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </View>
          )}

          <View style={{ height: 30 }} />
        </ScrollView>
      )}

      {/* ADD / EDIT RECIPE FORM */}

      {screen === 'form' && (
        <ScrollView
          style={styles.formScroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.formHeading}>
            {editingId ? 'Update your recipe ✏️' : 'Share your creation 🍳'}
          </Text>

          <Text style={styles.formDescription}>
            Fill in the details to {editingId ? 'update' : 'add'} your
            recipe.
          </Text>

          <Text style={styles.inputLabel}>Recipe Name *</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g. Homemade Pasta"
            value={form.name}
            onChangeText={(value) => updateForm('name', value)}
          />

          <Text style={styles.inputLabel}>Category</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {categories
              .filter((item) => item !== 'All' && item !== 'My Food')
              .map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => updateForm('category', category)}
                  style={[
                    styles.categoryChip,
                    form.category === category &&
                      styles.categoryChipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      form.category === category &&
                        styles.categoryTextActive,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <Text style={styles.inputLabel}>Recipe Image</Text>

          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={styles.imagePickerText}>
              📷 Choose Image from Gallery
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR enter an image URL</Text>

          <TextInput
            style={styles.input}
            placeholder="https://example.com/food.jpg"
            value={form.image}
            onChangeText={(value) => updateForm('image', value)}
            autoCapitalize="none"
          />

          {form.image ? (
            <Image
              source={{ uri: form.image }}
              style={styles.formImagePreview}
              resizeMode="cover"
            />
          ) : null}

          <Text style={styles.inputLabel}>Preparation Time (minutes)</Text>

          <TextInput
            style={styles.input}
            placeholder="20"
            value={form.time}
            onChangeText={(value) => updateForm('time', value)}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Number of Servings</Text>

          <TextInput
            style={styles.input}
            placeholder="2"
            value={form.servings}
            onChangeText={(value) => updateForm('servings', value)}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Calories per Serving</Text>

          <TextInput
            style={styles.input}
            placeholder="250"
            value={form.calories}
            onChangeText={(value) => updateForm('calories', value)}
            keyboardType="numeric"
          />

          <Text style={styles.inputLabel}>Difficulty Level</Text>

          <View style={styles.difficultyRow}>
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <TouchableOpacity
                key={level}
                onPress={() => updateForm('difficulty', level)}
                style={[
                  styles.difficultyChip,
                  form.difficulty === level &&
                    styles.difficultyChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.difficultyChipText,
                    form.difficulty === level &&
                      styles.difficultyChipTextActive,
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>
            Ingredients * (one per line)
          </Text>

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder={'2 tomatoes\n1 onion\n1 cup flour'}
            value={form.ingredients}
            onChangeText={(value) => updateForm('ingredients', value)}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.inputLabel}>
            Step-by-Step Instructions * (one per line)
          </Text>

          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder={
              'Wash and chop the vegetables.\nHeat oil in a pan.\nCook until ready.'
            }
            value={form.instructions}
            onChangeText={(value) => updateForm('instructions', value)}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={saveRecipe}
          >
            <Text style={styles.addButtonText}>
              {editingId ? '✓ Update Recipe' : '✓ Save Recipe'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={goBack}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}

      {/* BOTTOM NAVIGATION */}

      {screen !== 'form' && screen !== 'detail' && (
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => selectCategory('All')}
          >
            <Text style={styles.navEmoji}>🏠</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={openFavorites}
          >
            <Text style={styles.navEmoji}>❤️</Text>
            <Text style={styles.navLabel}>Favorites</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={openAddForm}
          >
            <Text style={styles.navEmoji}>➕</Text>
            <Text style={styles.navLabel}>Add Recipe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={openMyFood}
          >
            <Text style={styles.navEmoji}>👨‍🍳</Text>
            <Text style={styles.navLabel}>My Food</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

// ------------------------------------
// 11. STYLES
// ------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F2',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#FFF9F2',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backText: {
    fontSize: 32,
    color: '#292929',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#292929',
  },

  headerFavorite: {
    padding: 6,
  },

  welcome: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 25,
  },

  welcomeSmall: {
    color: '#E66A35',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  welcomeTitle: {
    fontSize: 32,
    lineHeight: 39,
    fontWeight: '900',
    color: '#292929',
  },

  welcomeSubtitle: {
    fontSize: 14,
    color: '#77716D',
    lineHeight: 21,
    marginTop: 8,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 12,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#292929',
  },

  countText: {
    fontSize: 12,
    color: '#8A817B',
  },

  categoryScroll: {
    flexGrow: 0,
    marginBottom: 14,
  },

  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F0E7DD',
    marginRight: 9,
    marginBottom: 8,
  },

  categoryChipActive: {
    backgroundColor: '#E66A35',
    borderColor: '#E66A35',
  },

  categoryText: {
    color: '#5E5650',
    fontSize: 13,
    fontWeight: '700',
  },

  categoryTextActive: {
    color: '#FFFFFF',
  },

  recipeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },

  recipeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  cardImage: {
    width: '100%',
    height: 125,
    backgroundColor: '#F0E7DD',
  },

  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  placeholderEmoji: {
    fontSize: 42,
  },

  heartButton: {
    position: 'absolute',
    top: 9,
    right: 9,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },

  heartText: {
    fontSize: 17,
  },

  cardContent: {
    padding: 11,
  },

  cardCategory: {
    color: '#E66A35',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    marginBottom: 5,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#292929',
    marginBottom: 7,
  },

  cardMeta: {
    color: '#77716D',
    fontSize: 11,
  },

  addButton: {
    backgroundColor: '#E66A35',
    marginHorizontal: 18,
    marginTop: 18,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  detailImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#F0E7DD',
  },

  detailContent: {
    paddingHorizontal: 21,
    paddingTop: 22,
    paddingBottom: 25,
  },

  detailTitle: {
    fontSize: 29,
    fontWeight: '900',
    color: '#292929',
    marginBottom: 18,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  statBox: {
    width: '31%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 14,
  },

  statEmoji: {
    fontSize: 22,
    marginBottom: 7,
  },

  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#292929',
  },

  statLabel: {
    fontSize: 11,
    color: '#77716D',
    marginTop: 4,
  },

  difficultyBox: {
    backgroundColor: '#FFF0E5',
    padding: 13,
    borderRadius: 12,
    marginBottom: 14,
  },

  difficultyText: {
    fontWeight: '700',
    color: '#A64A22',
  },

  favoriteDetailButton: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E7DD',
  },

  favoriteDetailText: {
    color: '#292929',
    fontWeight: '800',
  },

  detailSectionTitle: {
    fontSize: 21,
    fontWeight: '900',
    color: '#292929',
    marginTop: 26,
    marginBottom: 16,
  },

  listRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 13,
  },

  bullet: {
    color: '#E66A35',
    marginRight: 12,
    marginTop: 5,
    fontSize: 11,
  },

  listText: {
    flex: 1,
    color: '#514B46',
    fontSize: 15,
    lineHeight: 23,
  },

  instructionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 17,
  },

  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E66A35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  instructionText: {
    flex: 1,
    color: '#514B46',
    fontSize: 14,
    lineHeight: 23,
    paddingTop: 3,
  },

  managementRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },

  editButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#E7F3E8',
    borderRadius: 12,
    alignItems: 'center',
  },

  editButtonText: {
    color: '#276738',
    fontWeight: '800',
  },

  deleteButton: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFE8E5',
    borderRadius: 12,
    alignItems: 'center',
  },

  deleteButtonText: {
    color: '#B52B21',
    fontWeight: '800',
  },

  listScreenIntro: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
  },

  listScreenTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#292929',
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 45,
  },

  emptyEmoji: {
    fontSize: 55,
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#292929',
    textAlign: 'center',
  },

  emptyText: {
    color: '#77716D',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 10,
    paddingHorizontal: 18,
  },

  formScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },

  formHeading: {
    fontSize: 25,
    fontWeight: '900',
    color: '#292929',
    marginTop: 15,
  },

  formDescription: {
    color: '#77716D',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#39332F',
    marginTop: 17,
    marginBottom: 9,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EDE3D9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: '#292929',
  },

  multilineInput: {
    minHeight: 120,
    lineHeight: 22,
  },

  imagePickerButton: {
    padding: 16,
    backgroundColor: '#FFF0E5',
    borderRadius: 12,
    alignItems: 'center',
  },

  imagePickerText: {
    color: '#A64A22',
    fontSize: 14,
    fontWeight: '800',
  },

  orText: {
    textAlign: 'center',
    color: '#888078',
    marginVertical: 12,
    fontSize: 12,
  },

  formImagePreview: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    marginTop: 12,
  },

  difficultyRow: {
    flexDirection: 'row',
    gap: 10,
  },

  difficultyChip: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDE3D9',
  },

  difficultyChipActive: {
    backgroundColor: '#E66A35',
    borderColor: '#E66A35',
  },

  difficultyChipText: {
    color: '#514B46',
    fontWeight: '700',
  },

  difficultyChipTextActive: {
    color: '#FFFFFF',
  },

  cancelButton: {
    marginTop: 12,
    padding: 14,
    alignItems: 'center',
  },

  cancelButtonText: {
    color: '#77716D',
    fontWeight: '800',
  },

  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0E7DD',
  },

  navItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
  },

  navEmoji: {
    fontSize: 21,
  },

  navLabel: {
    color: '#514B46',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
});