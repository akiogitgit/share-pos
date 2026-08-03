import {type NextPage} from 'next';
import {useSearchParams} from 'next/navigation';
import {useMemo} from 'react';
import {BookmarkFolderList} from 'components/bookmark/BookmarkFolderList';
import {Layout} from 'components/layout/Layout';
import {PostItem} from 'components/post/PostItem';
import {CreateFolderButton} from 'components/shares/CreateFolderButton';
import {useRequireLogin} from 'hooks/login/useRequireLogin';
import {useGetApi} from 'hooks/useApi';
import {type Folder, type BookmarkPosts} from 'types/bookmark';

const Bookmark: NextPage = () => {
	useRequireLogin();
	const searchParameters = useSearchParams();
	const {data: folders} = useGetApi<Folder[]>('/folders');

	// 選択したフォルダをURLパラメータから取得
	const selectedFolderIndex = useMemo(
		() => Number(searchParameters.get('id')) || 0,
		[searchParameters],
	);

	// 古いデータがあれば、自動的に再取得
	const {data: bookmarkPosts} = useGetApi<BookmarkPosts>(
		`/folders/${folders?.[selectedFolderIndex]?.id}`,
		{options: {revalidateIfStale: true}},
	);
	// フォルダが無い
	if (!folders?.length) {
		return (
			<Layout>
				<div className='flex ml-4 justify-between'>
					<h1 className='font-bold text-xl'>ブックマーク</h1>
					<div>
						<CreateFolderButton />
					</div>
				</div>
				<div className='mx-auto mt-20 w-300px'>
					<p>1. フォルダを作成してみよう！</p>
					<p>2. 記事をブックマークしよう！</p>
					<p>画像を貼って手順を分かりやすく表示</p>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			{/* スマホ */}
			<div className='flex items-center justify-between sm:hidden'>
				<h1 className='font-bold text-xl'>ブックマーク</h1>
				<div>
					<CreateFolderButton />
				</div>
			</div>

			<div className='sm:(flex gap-3 items-start) '>
				{/* 自分のフォルダ一覧 */}
				<div className='bg-primary-light ml-0 top-0px z-2 sticky sm:(z-1 top-20 ml-4) '>
					{/* PC */}
					<div className='hidden sm:block'>
						<h1 className='font-bold text-xl'>ブックマーク</h1>
						<div className='mt-12'>
							<CreateFolderButton />
						</div>
					</div>

					<div className='mx-[-16px] mt-4 sm:(mt-4 mx-0) '>
						<BookmarkFolderList folders={folders} />
					</div>
				</div>

				{/* 選択しているフォルダの記事一覧 */}
				{bookmarkPosts?.posts.length && folders ? (
					<div className='mt-12 w-full sm:mt-21'>
						<div className='grid gap-6 justify-center items-start sm:(gap-x-3 grid-cols-[repeat(auto-fill,minmax(291px,auto))]) '>
							{bookmarkPosts.posts.map((post, index) => (
								<PostItem
									key={index}
									post={post}
									// Postはどのフォルダに居るか知らない
									folderId={folders[selectedFolderIndex].id}
								/>
							))}
						</div>
					</div>
				) : (
				// 記事が無い
					<div className='mt-20 text-center w-full'>記事がありません</div>
				)}
			</div>
		</Layout>
	);
};

export default Bookmark;
