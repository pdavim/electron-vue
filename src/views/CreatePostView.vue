<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="title"
      required
    ></v-text-field>

    <div id="editorjs"></div>
    <button @click="save">Save</button>

    <v-select
      v-model="statusSelect"
      :items="status"
      :rules="[(v) => !!v || 'Item is required']"
      label="status"
      required
    ></v-select>

    <v-select
      v-model="categoriesSelect"
      :items="categories"
      :rules="[(v) => !!v || 'Item is required']"
      label="categories"
      required
    ></v-select>

    <v-select
      v-model="tagsSelected"
      :items="tags"
      :rules="[(v) => !!v || 'Item is required']"
      label="tags"
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[(v) => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
  </v-form>
</template>
<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import SimpleImage from "@editorjs/simple-image";
import Marker from "@editorjs/marker";
import CodeTool from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
// import Editor from "../components/EditorComponent.vue";

export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    statusSelect: null,
    status: ["draft", "publish", "future", "pending", "private"],
    categories: [1, 2, 3, 3],
    categoriesSelect: null,
    tags: [1, 2, 3],
    tagsSelected: null,
    checkbox: false,
    value: null,
    editorJSConfig: {},
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    save: function () {
      editor.save().then((savedData) => {
        console.log(savedData);
        this.value = savedData;
      });
    },
    myEditor: function () {
      window.editor = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        /**
         * This Tool will be used as default
         */
        initialBlock: "paragraph",
        tools: {
          header: {
            class: Header,
            shortcut: "CMD+SHIFT+H",
          },
          list: {
            class: List,
          },
          paragraph: {
            class: Paragraph,
            config: {
              placeholder: ".",
            },
          },
          warning: Warning,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
              },
            },
          },
          // image: SimpleImage,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          code: {
            class: CodeTool,
            shortcut: "CMD+SHIFT+C",
          },
          delimiter: Delimiter,
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+C",
          },
          linkTool: LinkTool,

          embed: Embed,

          table: {
            class: Table,
            inlineToolbar: true,
            shortcut: "CMD+ALT+T",
          },
        },

        /**
         * Previously saved data that should be rendered
         */
        data: {
          blocks: [
            {
              type: "header",
              data: {
                text: "Editor.js",
                level: 2,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.",
              },
            },
            {
              type: "header",
              data: {
                text: "Key features",
                level: 3,
              },
            },
            {
              type: "list",
              data: {
                items: [
                  "It is a block-styled editor",
                  "It returns clean data output in JSON",
                  "Designed to be extendable and pluggable with a simple API",
                ],
                style: "unordered",
              },
            },
            {
              type: "header",
              data: {
                text: "What does it mean «block-styled editor»",
                level: 3,
              },
            },
            {
              type: "paragraph",
              data: {
                text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
              },
            },
            {
              type: "paragraph",
              data: {
                text: `There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.`,
              },
            },
            {
              type: "header",
              data: {
                text: "What does it mean clean data output",
                level: 3,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
              },
            },
            {
              type: "paragraph",
              data: {
                text: `Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.`,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Clean data is useful to sanitize, validate and process on the backend.",
              },
            },
            {
              type: "delimiter",
              data: {},
            },
            {
              type: "paragraph",
              data: {
                text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
              },
            },
            {
              type: "image",
              data: {
                url: "assets/codex2x.png",
                caption: "",
                stretched: false,
                withBorder: true,
                withBackground: false,
              },
            },
          ],
        },
        onReady: function () {
          console.log("ready");
        },
        onChange: function () {
          console.log("change");
        },
      });
    },
  },
  mounted: function () {
    this.myEditor();
  },
};
</script>
