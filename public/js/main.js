({
    init: function() {
        var me = this;
        me.deleteArticle = $('.delete-article');

        me.event();
    },
    event: function() {
        var me = this;
        me.deleteArticle.click(function() {
            var id = $(this).data("id");
            $.ajax({
                type: 'DELETE',
                url: '/articles/' + id,
                success: function() {
                    alert('文章删除成功！');
                    window.location.href = "/";
                },
                erorr: function(err) {
                    console.log(err);
                }
            })
        })
    }
}).init();
