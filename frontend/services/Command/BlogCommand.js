import BlogList from "../BlogList.js";

export const BLOG_COMMAND = {
    ADD_FAVORITE: "add-favorite",
    REMOVE_FAVORITE: "remove-favorite",
    SAVE_BLOG: 'save-blog'
};

export const BlogCommandExecutor = {

    execute(command) {
        switch(command.name) {
            case BLOG_COMMAND.ADD_FAVORITE:
                const blogFavoriteId = command.args.blogId;
                BlogList.instance.addFavorite(blogFavoriteId);
                break;

            case BLOG_COMMAND.REMOVE_FAVORITE:
                const blogNotFavoriteId = command.args.blogId;
                BlogList.instance.removeFavorite(blogNotFavoriteId);
                break;

            case BLOG_COMMAND.SAVE_BLOG:
                const blogSaveId = command.args.blogId;
                BlogList.instance.saveBlog(blogSaveId, command.args.title, command.args.content);
                break;
        }
    }
}