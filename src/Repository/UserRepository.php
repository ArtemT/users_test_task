<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class UserRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, User::class);
    }

    public function search($filterBy, $filterKey, $sortBy, $sortOrder) {
        $q = $this->createQueryBuilder('u')
            ->where('u.' . $filterBy . ' LIKE :key')
            ->setParameter('key', '%' . $filterKey . '%')
            ->orderBy('u.' . $sortBy, $sortOrder)
            ->getQuery();
        return $q->execute();
    }
}