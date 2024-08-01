siyixej645@carspure.com

  {
              isBookmarkTab ? (
                isLoadingBookmark? (
                  <p className="text-white">Loading Bookmarks</p>
                ):bookmarkedPosts?.length === 0 ? (
                  <p className="text-white">No Bookmarks Yet</p>
                ) : (
                  <div className="mt-10 flex flex-wrap">
                    {Array.isArray(bookmarkedPosts) && bookmarkedPosts.map((bookmarkedPost) => (
                      <ProfilePosts key={bookmarkedPost.id} id={bookmarkedPost.id} image={bookmarkedPost.image} />
                    ))}
                  </div>
                ) 
              ) : isLoadingPosts ? (
                <p className="text-white">Loading Posts</p>
              ) : posts?.length === 0 ? (<p>No Posts Yet</p>) : (
                <div className="mt-10 flex flex-wrap">
                  {Array.isArray(posts) && posts?.map((post) => (
                    <ProfilePosts key={post.id} id={post.id} image={post.image} />
                  ))}
                </div>
              )
            }



            data: bookmarkedPosts, refetch: refetchBookmarkedPosts, isLoading: isLoadingBookmarkedPosts