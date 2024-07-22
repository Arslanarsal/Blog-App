import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf"
import { asyncThunkCreator } from "@reduxjs/toolkit";

export class Service {
    clint = new Client();
    databases;
    bucket;
    constructor() {
        this.clint
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.databases = new Databases(this.clint);
        this.bucket = new Storage(this.clint);
    }

    async creatPost({ title, slug, content, fratureImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appWriteUrl,
                conf.appWriteCollectionId,
                slug,
                {
                    title, content, fratureImage, status, userId
                },
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug, { title, content, fratureImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appWriteUrl,
                conf.appWriteCollectionId,
                slug,
                {
                    title, content, fratureImage, status
                },
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appWriteUrl,
                conf.appWriteCollectionId,
                slug,

            )
            return true;
        } catch (error) {
            throw error
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appWriteUrl,
                conf.appWriteCollectionId,
                slug,

            )
        } catch (error) {
            throw error
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appWriteUrl,
                conf.appWriteCollectionId,
                [
                    Query.equal('status', "active"),
                ]
            )
        } catch (error) {
            throw error
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appWriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;