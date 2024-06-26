<script setup>
import {ref, onMounted} from 'vue'
import { useRouter} from 'vue-router'

import {initializeApp} from 'firebase/app'
import {getFirestore, doc, setDoc, runTransaction} from "firebase/firestore";

import { firebaseConfig } from '../constant.js'

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const posts = ref()
const router = useRouter()

const fetchPost = async () => {
    await runTransaction(db, async transaction => {
        const sfDoc = await transaction.get(doc(db, "mails", "message"));

        posts.value = sfDoc.data().posts.reverse()
    })
}

const updateMessage = async (id) => {
    try {
        await runTransaction(db, async transaction => {
            const sfDoc = await transaction.get(doc(db, "mails", "message"));
            posts.value = sfDoc.data().posts.reverse()

            transaction.update(doc(db, "mails", "message"), { posts: sfDoc.data().posts.map(el => {
                    if (el.id === Number(id)) {
                        return {
                            ...el,
                            favorites: !el.favorites
                        }
                    }

                    return el
                }) });
        })
    } finally {
        fetchPost()
    }
}

onMounted(() => {
    fetchPost()
})
</script>

<template>
    <h1>
        Избранное
    </h1>

    <div class="ui-mail">
        <template v-for="item in posts" :key="item.id">
            <div v-if="item.favorites" :class="{'ui-mail-line': true}">
                <div class="ui-mail-line__item ui-mail-line-center" @click="updateMessage(item.id)">
                    <v-icon v-if="item.favorites" icon="mdi-star" class="ui-mail-line__star" />
                    <v-icon v-else icon="mdi-star-outline" class="ui-mail-line__star" />
                </div>
                <div class="ui-mail-line__item checkbox">
                    <input type="checkbox">
                </div>
                <div class="ui-mail-line__item ui-mail-content">
                    <h2 @click="router.push(`/mail/${item.id}`)">{{ item.header }}</h2>
                    <div class="ui-mail-text">
                        {{ item.text }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" scoped>
.ui-mail {
    margin: 20px 0;
    background: #ECECEC91;
    border: 1px solid rgba(211, 211, 211, 0.89);
    border-radius: 10px;
    overflow: hidden;

    &-line {
        display: flex;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid rgba(211, 211, 211, 0.89);
        background: rgba(100, 255, 232, 0.33);
        transition: all .3s;

        &:hover {
            background: #f3eeb9;
        }

        &-center {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__star {
            cursor: pointer;
        }

        &__isRead {
            background-color: transparent;
            opacity: .6;
        }

        &:last-child {
            border: 0;
        }

        &__item {
            width: 5%;
            height: 35px;
            padding: 0 10px;
            border-right: 1px solid #000;

            &.checkbox {
                display: flex;
                justify-content: center;
                align-items: center;

                input {
                    height: 20px;
                    width: 20px;
                    cursor: pointer;
                    -webkit-appearance: checkbox;
                }
            }

            &:last-child {
                border: 0;
            }
        }

        .ui-mail-content {
            width: 80%;
        }
    }

    &-content {
        h2 {
            padding-bottom: 5px;
            font-weight: 600;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    &-text {
        font-size: 12px;
        font-style: italic;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        padding-right: 20px;
        width: 100%;
    }
}
</style>
