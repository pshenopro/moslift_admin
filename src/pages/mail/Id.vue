<script setup>
import { useRoute, useRouter} from 'vue-router'
import { ref, onMounted } from "vue";

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc, runTransaction  } from "firebase/firestore";

import { fetchFile } from '/src/composables/useStore.js'

import { firebaseConfig } from '../../constant.js'

const route = useRoute()
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const data = ref()

const updateMessage = async () => {
    await runTransaction(db, async transaction => {
        const sfDoc = await transaction.get(doc(db, "mails", "message"));
        data.value = sfDoc.data().posts.find(el => el.id === Number(route.params.id))

        transaction.update(doc(db, "mails", "message"), { posts: sfDoc.data().posts.map(el => {
            if (el.id === Number(route.params.id)) {
                return {
                    ...el,
                    isRead: true
                }
            }

            return el
            }) });
    })
}

const getFile = async (file) => {
    const data = await fetchFile(file)

    const link = document.createElement('a');
    link.setAttribute('href',data);
    link.setAttribute('download','download');
    link.click();
}

onMounted(() => {
    updateMessage()
})

</script>

<template>
    <div class="mail-id">
        <h1>{{ data?.header }}</h1>

        <div v-if="data" v-html="data.html" />

        <div v-if="data?.fileName?.length" class="mail-id__file">
            <h3>Файлы</h3>
            <p v-for="file in data.fileName">
                <div @click="getFile(file)">{{ file }}</div>
            </p>
        </div>
    </div>
</template>

<style lang="scss">
    .mail-id {
        background: rgba(236, 236, 236, 0.568627451);
        border: 1px solid rgba(211, 211, 211, 0.89);
        border-radius: 10px;
        overflow: hidden;
        padding: 20px;

        h1 {
            padding-bottom: 30px;
            font-size: 24px;
            font-weight: 600;
        }

        li {
            padding-left: 10px;
            margin-bottom: 20px;
            border-left: 1px solid #000;
        }

        &__file {
            margin-top: 20px;
            color: #535bf2;
            cursor: pointer;

            h3 {
                font-size: 20px;
                font-weight: 600;
                color: #000;
                padding-bottom: 20px;
            }

            p {
                padding-bottom: 20px;
            }
        }
    }
</style>
