package projectappdev.supercook.Request;

public class IngredientRequest {
    private Integer recipeId;
    private String name;

    // Getters and Setters
    public Integer getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(Integer recipeId) {
        this.recipeId = recipeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}